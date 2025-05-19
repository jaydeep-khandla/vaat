export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  constructor(data: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
  }
}

export class UserResponseDto {
  email: string;
  username: string;
  provider: string;
  roles: string[];
  isActive: boolean;
  isDeleted: boolean;
  lastLogin: Date | null;
  createdAt: Date;

  constructor(data: {
    email: string;
    username: string;
    provider: string;
    roles: string[];
    isActive: boolean;
    isDeleted: boolean;
    lastLogin: Date | null;
    createdAt: Date;
  }) {
    this.email = data.email;
    this.username = data.username;
    this.provider = data.provider;
    this.roles = data.roles;
    this.isActive = data.isActive;
    this.isDeleted = data.isDeleted;
    this.lastLogin = data.lastLogin;
    this.createdAt = data.createdAt;
  }
}
