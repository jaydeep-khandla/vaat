import { User } from '../schemas';

class UserDao {
  User;

  constructor() {
    // Initialize the User model
    this.User = User;
  }

  async createUser(userData: Object) {
    try {
      const user = new this.User(userData);
      await user.save();
      return user;
    } catch (error: any) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async getUserById(
    userId: string,
    Projection: Object = {},
    options: Object = {}
  ) {
    try {
      const user = await this.User.findById(userId, Projection, options);
      return user;
    } catch (error: any) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  async getUserByField(
    field: Object,
    Projection: Object = {},
    options: Object = {}
  ) {
    try {
      const user = await this.User.findOne(field, Projection, options);
      return user;
    } catch (error: any) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }
}

export default UserDao;
