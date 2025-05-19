import { Document, Schema } from 'mongoose';

export default interface IToken extends Document {
  userId: Schema.Types.ObjectId;
  refreshToken: string;
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
