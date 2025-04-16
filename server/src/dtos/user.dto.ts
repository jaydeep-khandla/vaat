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
  userId: string;
  email: string;
  username: string;

  constructor(data: { userId: string; email: string; username: string }) {
    this.userId = data.userId;
    this.email = data.email;
    this.username = data.username;
  }
}
