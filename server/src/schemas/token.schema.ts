import mongoose, { Document, Schema, Model } from 'mongoose';
import { IToken } from '../models';

const TokenSchema: Schema<IToken> = new Schema<IToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
TokenSchema.index({ userId: 1, refreshToken: 1 });
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for automatic cleanup

const Token: Model<IToken> = mongoose.model<IToken>('Token', TokenSchema);
export default Token;
