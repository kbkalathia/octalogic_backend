import UsersModel from "../models/users.model";

class UserServiceClass {
  async createUser(userData: Record<string, any>) {
    return await UsersModel.create(userData);
  }
}

const UserService = new UserServiceClass();
export default UserService;
