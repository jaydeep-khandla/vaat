import mongoose, { Document, Schema, Model } from 'mongoose';
import { PROVIDER_TYPES, ROLES } from '../config/constants';
import { IUser } from '../models';

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider === PROVIDER_TYPES.LOCAL;
      },
      default: null,
    },
    provider: {
      type: String,
      enum: Object.values(PROVIDER_TYPES),
      default: PROVIDER_TYPES.LOCAL,
      required: true,
    },
    providerId: {
      type: String,
      required: function (this: IUser) {
        return this.provider !== PROVIDER_TYPES.LOCAL;
      },
    },
    roles: {
      type: [String],
      default: [ROLES.USER],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Instance method to update the lastLogin timestamp
UserSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  await this.save();
};

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
