
import { TypeAuth, User } from "../../database/entities/User";
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

  async getById(id:number){
    try {
      const user = await UserRepository.getById(id);

      return user
    } catch (error) {
      throw error;
    }
  }

  async getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User> {
    try {
      const user = await UserRepository.getAccountGoogle(typeAuth, googleId);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserHandler();