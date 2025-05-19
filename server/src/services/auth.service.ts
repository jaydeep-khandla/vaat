import { UserDao, TokenDao } from '../daos';
import { UserResponseDto, CreateUserDto } from '../dtos/user.dto';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config';
import bcrypt from 'bcrypt';
import { UnauthorizedError, BadRequestError } from '../utils/response';
import { IUser } from '../models';
import { ObjectId } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import { PROVIDER_TYPES } from '../config/constants';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface GoogleUserInfo {
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  sub: string; // Google User ID
}

export default class AuthService {
  private userDao: UserDao;
  private tokenDao: TokenDao;
  private googleClient: OAuth2Client;

  constructor() {
    this.userDao = new UserDao();
    this.tokenDao = new TokenDao();
    this.googleClient = new OAuth2Client(
      appConfig.google.clientId,
      appConfig.google.clientSecret,
      appConfig.google.redirectUri
    );
  }

  public async register(userData: CreateUserDto): Promise<UserResponseDto> {
    // Hash password before storing
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    const user = await this.userDao.createUser(userData);
    return new UserResponseDto(user);
  }

  public async login(
    email: string,
    password: string
  ): Promise<{ user: UserResponseDto; tokens: TokenPair }> {
    const user = await this.userDao.getUserByField({ email });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check password
    if (!user.password || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Update last login time
    await user.updateLastLogin();

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: new UserResponseDto(user),
      tokens,
    };
  }

  public async refreshToken(
    userId: string,
    refreshToken: string
  ): Promise<TokenPair> {
    // Verify the refresh token exists and is valid
    const tokenDoc = await this.tokenDao.findToken(userId, refreshToken);

    if (!tokenDoc) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Check if token is expired
    if (tokenDoc.expiresAt < new Date()) {
      await this.tokenDao.revokeToken(userId, refreshToken);
      throw new UnauthorizedError('Refresh token expired');
    }

    // Get user to generate new tokens
    const user = await this.userDao.getUserById(userId);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    // Revoke current refresh token and generate new tokens
    await this.tokenDao.revokeToken(userId, refreshToken);

    return this.generateTokens(user);
  }

  public async logout(userId: string, refreshToken: string): Promise<boolean> {
    return this.tokenDao.revokeToken(userId, refreshToken);
  }

  public async logoutAll(userId: string): Promise<boolean> {
    return this.tokenDao.revokeAllUserTokens(userId);
  }

  public async findUser(field: Object): Promise<UserResponseDto | null> {
    const user = await this.userDao.getUserByField(field);
    return user ? new UserResponseDto(user) : null;
  }

  public async getUserById(userId: string): Promise<UserResponseDto | null> {
    const user = await this.userDao.getUserById(userId);
    return user ? new UserResponseDto(user) : null;
  }

  private async generateTokens(user: IUser): Promise<TokenPair> {
    // Create token payload
    const payload = {
      id: user._id,
      email: user.email,
      roles: user.roles,
    };

    // Generate access token
    const accessToken = jwt.sign(payload, appConfig.jwt.secret, {
      expiresIn: appConfig.jwt.accessTokenExpiresIn,
    });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: user._id }, appConfig.jwt.secret, {
      expiresIn: appConfig.jwt.refreshTokenExpiresIn,
    });

    // Calculate expiration date for refresh token
    const refreshExpiryDuration = appConfig.jwt.refreshTokenExpiresIn;
    const expiresAt = new Date();

    // Parse the duration string (e.g., "7d", "24h", "60m", "3600s")
    const durationRegex = /^(\d+)([smhd])$/;
    const match = refreshExpiryDuration.match(durationRegex);

    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];

      switch (unit) {
        case 's': // seconds
          expiresAt.setSeconds(expiresAt.getSeconds() + value);
          break;
        case 'm': // minutes
          expiresAt.setMinutes(expiresAt.getMinutes() + value);
          break;
        case 'h': // hours
          expiresAt.setHours(expiresAt.getHours() + value);
          break;
        case 'd': // days
          expiresAt.setDate(expiresAt.getDate() + value);
          break;
        default:
          // Default to 7 days if format is not recognized
          expiresAt.setDate(expiresAt.getDate() + 7);
      }
    } else {
      // Default to 7 days if format is not recognized
      expiresAt.setDate(expiresAt.getDate() + 7);
    }

    // Save refresh token to database
    await this.tokenDao.createToken(
      user._id as ObjectId,
      refreshToken,
      expiresAt
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  public async googleLogin(
    code: string
  ): Promise<{ user: UserResponseDto; tokens: TokenPair }> {
    try {
      // Exchange the authorization code for tokens
      const { tokens } = await this.googleClient.getToken(code);

      // Verify the ID token
      const ticket = await this.googleClient.verifyIdToken({
        idToken: tokens.id_token!,
        audience: appConfig.google.clientId,
      });

      // Get user info from the token
      const payload = ticket.getPayload() as GoogleUserInfo;

      if (!payload || !payload.email) {
        throw new UnauthorizedError('Invalid Google account');
      }

      // Check if user exists
      let user = await this.userDao.getUserByField({
        email: payload.email,
      });

      if (!user) {
        // Create new user with Google provider
        user = await this.userDao.createUser({
          email: payload.email,
          username: payload.name || payload.email.split('@')[0],
          provider: PROVIDER_TYPES.GOOGLE,
          providerId: payload.sub,
          roles: ['USER'],
          isActive: true,
          isDeleted: false,
        });
      } else if (user.provider !== PROVIDER_TYPES.GOOGLE) {
        // User exists but registered with a different method
        throw new BadRequestError(
          'Email already registered with a different method'
        );
      }

      // Update last login time (null check is necessary)
      if (user) {
        await user.updateLastLogin();

        // Generate tokens
        const authTokens = await this.generateTokens(user);

        return {
          user: new UserResponseDto(user),
          tokens: authTokens,
        };
      }

      throw new Error('Failed to authenticate with Google');
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('Failed to authenticate with Google');
    }
  }

  // public generateGoogleAuthUrl(): string {
  //   return this.googleClient.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: [
  //       'https://www.googleapis.com/auth/userinfo.profile',
  //       'https://www.googleapis.com/auth/userinfo.email',
  //     ],
  //     prompt: 'consent',
  //   });
  // }
}
