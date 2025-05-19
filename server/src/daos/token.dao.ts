import { Token } from '../schemas';
import { IToken } from '../models';
import { Schema } from 'mongoose';

class TokenDao {
  private Token: typeof Token;

  constructor() {
    this.Token = Token;
  }

  async createToken(
    userId: Schema.Types.ObjectId | string,
    refreshToken: string,
    expiresAt: Date
  ): Promise<IToken> {
    try {
      const token = new this.Token({
        userId,
        refreshToken,
        expiresAt,
        isRevoked: false,
      });
      await token.save();
      return token;
    } catch (error: any) {
      throw new Error('Error creating token: ' + error.message);
    }
  }

  async findToken(
    userId: Schema.Types.ObjectId | string,
    refreshToken: string
  ): Promise<IToken | null> {
    try {
      return await this.Token.findOne({
        userId,
        refreshToken,
        isRevoked: false,
      });
    } catch (error: any) {
      throw new Error('Error finding token: ' + error.message);
    }
  }

  async revokeToken(
    userId: Schema.Types.ObjectId | string,
    refreshToken: string
  ): Promise<boolean> {
    try {
      const result = await this.Token.updateOne(
        { userId, refreshToken },
        { isRevoked: true }
      );
      return result.modifiedCount > 0;
    } catch (error: any) {
      throw new Error('Error revoking token: ' + error.message);
    }
  }

  async revokeAllUserTokens(
    userId: Schema.Types.ObjectId | string
  ): Promise<boolean> {
    try {
      const result = await this.Token.updateMany(
        { userId },
        { isRevoked: true }
      );
      return result.modifiedCount > 0;
    } catch (error: any) {
      throw new Error('Error revoking all user tokens: ' + error.message);
    }
  }

  async cleanupExpiredTokens(): Promise<number> {
    try {
      const now = new Date();
      const result = await this.Token.deleteMany({
        $or: [{ expiresAt: { $lt: now } }, { isRevoked: true }],
      });
      return result.deletedCount;
    } catch (error: any) {
      throw new Error('Error cleaning up expired tokens: ' + error.message);
    }
  }
}

export default TokenDao;
