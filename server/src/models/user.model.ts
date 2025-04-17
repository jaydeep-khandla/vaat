import { Document } from 'mongoose';
import { PROVIDER_TYPES } from '../config/constants';

export interface IUser extends Document {
  email: string;
  username: string;
  password?: string;
  provider: (typeof PROVIDER_TYPES)[keyof typeof PROVIDER_TYPES];
  providerId?: string;
  roles: string[];
  isActive: boolean;
  isDeleted: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;

  updateLastLogin(): Promise<void>;
}
