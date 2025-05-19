import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import Logger from '../utils/logger';
import { BadRequestError } from '../utils/response';
import { PROVIDER_TYPES } from '../config/constants';

const authService = new AuthService();
const logger = new Logger('auth-controller');

export default class Authcontroller {
  async signUp(req: Request, res: Response) {
    try {
      const { email, username, password, confirmPassword } = req.body;

      // Validate required fields
      if (!email || !username || !password || !confirmPassword) {
        throw new BadRequestError('All fields are required');
      }

      // Validate passwords match
      if (password !== confirmPassword) {
        throw new BadRequestError('Passwords do not match');
      }

      // Check if user already exists
      const existingUser = await authService.findUser({ email });
      if (existingUser) {
        throw new BadRequestError('User with this email already exists');
      }

      const user = await authService.register({
        email,
        username,
        password,
        confirmPassword,
      });

      logger.info(`User registered: ${email}`);
      return res.sendResponse(true, 'User registered successfully', 201, user);
    } catch (error: any) {
      logger.error(`Error in signUp: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error signing up user',
        error.status || 500,
        null
      );
    }
  }

  async verifyUser(req: Request, res: Response) {
    try {
      // This would be used for email verification, OTP validation, etc.
      // For now, it's a placeholder
      return res.sendResponse(true, 'User verified successfully', 200, null);
    } catch (error: any) {
      logger.error(`Error in verifyUser: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error verifying user',
        error.status || 500,
        null
      );
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequestError('Email and password are required');
      }

      const { user, tokens } = await authService.login(email, password);

      logger.info(`User logged in: ${email}`);

      // Return user data and tokens
      return res.sendResponse(true, 'User signed in successfully', 200, {
        user,
        tokens,
      });
    } catch (error: any) {
      logger.error(`Error in signIn: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error signing in user',
        error.status || 500,
        null
      );
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const userId = req.userId; // Set by auth middleware

      if (!refreshToken || !userId) {
        throw new BadRequestError('Refresh token and user ID are required');
      }

      const tokens = await authService.refreshToken(userId, refreshToken);

      return res.sendResponse(true, 'Token refreshed successfully', 200, {
        tokens,
      });
    } catch (error: any) {
      logger.error(`Error in refreshToken: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error refreshing token',
        error.status || 500,
        null
      );
    }
  }

  async signOut(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const userId = req.userId; // Set by auth middleware

      if (!refreshToken || !userId) {
        throw new BadRequestError('Refresh token and user ID are required');
      }

      await authService.logout(userId, refreshToken);

      return res.sendResponse(true, 'User signed out successfully', 200, null);
    } catch (error: any) {
      logger.error(`Error in signOut: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error signing out user',
        error.status || 500,
        null
      );
    }
  }

  async signOutAll(req: Request, res: Response) {
    try {
      const userId = req.userId; // Set by auth middleware

      if (!userId) {
        throw new BadRequestError('User ID is required');
      }

      await authService.logoutAll(userId);

      return res.sendResponse(
        true,
        'User signed out from all devices',
        200,
        null
      );
    } catch (error: any) {
      logger.error(`Error in signOutAll: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error signing out user from all devices',
        error.status || 500,
        null
      );
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        throw new BadRequestError('Email is required');
      }

      // Check if user exists
      const user = await authService.findUser({ email });

      if (!user) {
        // For security reasons, don't reveal if the user exists or not
        return res.sendResponse(
          true,
          'If your email is registered, you will receive a password reset link',
          200,
          null
        );
      }

      // Here you would generate a password reset token and send email
      // For now, it's a placeholder

      return res.sendResponse(
        true,
        'If your email is registered, you will receive a password reset link',
        200,
        null
      );
    } catch (error: any) {
      logger.error(`Error in forgotPassword: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error processing forgot password request',
        error.status || 500,
        null
      );
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword, confirmPassword } = req.body;

      if (!token || !newPassword || !confirmPassword) {
        throw new BadRequestError(
          'Token, new password, and confirm password are required'
        );
      }

      if (newPassword !== confirmPassword) {
        throw new BadRequestError('Passwords do not match');
      }

      // Here you would verify the reset token and update the password
      // For now, it's a placeholder

      return res.sendResponse(true, 'Password reset successfully', 200, null);
    } catch (error: any) {
      logger.error(`Error in resetPassword: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error resetting password',
        error.status || 500,
        null
      );
    }
  }

  // async googleAuthUrl(_req: Request, res: Response) {
  //   try {
  //     const authUrl = authService.generateGoogleAuthUrl();
  //     return res.sendResponse(
  //       true,
  //       'Google auth URL generated successfully',
  //       200,
  //       { authUrl }
  //     );
  //   } catch (error: any) {
  //     logger.error(`Error in googleAuthUrl: ${error.message}`);
  //     return res.sendResponse(
  //       false,
  //       error.message || 'Error generating Google auth URL',
  //       error.status || 500,
  //       null
  //     );
  //   }
  // }

  async googleCallback(req: Request, res: Response) {
    try {
      const { code } = req.body;

      if (!code) {
        throw new BadRequestError('Authorization code is required');
      }

      const { user, tokens } = await authService.googleLogin(code);

      logger.info(`User logged in with Google: ${user.email}`);

      return res.sendResponse(
        true,
        'User signed in successfully with Google',
        200,
        {
          user,
          tokens,
          provider: PROVIDER_TYPES.GOOGLE,
        }
      );
    } catch (error: any) {
      logger.error(`Error in googleCallback: ${error.message}`);
      return res.sendResponse(
        false,
        error.message || 'Error signing in with Google',
        error.status || 500,
        null
      );
    }
  }
}
