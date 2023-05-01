
import { User } from "src/database/entities/User";
import UserRepository from "../../database/repositories/UserRepository";
import IUserHandler from "./interface/IUserHandler";

class UserHandler implements IUserHandler {
  async getByEmail(email: string) {
    try {
      const user = await UserRepository.getByEmail(email);
      return user; 
    } catch (error) {
      throw error;
    }
  }
  async create(data: User): Promise<User> {
    try {
      const newUser = await UserRepository.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserHandler();