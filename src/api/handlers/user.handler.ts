import { UpdateResult } from "typeorm";
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

  async getById(id: number) {
    try {
      const user = await UserRepository.getById(id);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountLocalById(id: number): Promise<User> {
    try {
      const user = await UserRepository.getAccountLocalById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User> {
    try {
      const user = await UserRepository.getAccountLocal(typeAuth, email);
      return user;
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

  async getAccountFacebook(
    typeAuth: TypeAuth,
    facebookId: string
  ): Promise<User> {
    try {
      const user = await UserRepository.getAccountFacebook(
        typeAuth,
        facebookId
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountGithub(typeAuth: TypeAuth, githubId: string): Promise<User> {
    try {
      const user = await UserRepository.getAccountGithub(typeAuth, githubId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: User): Promise<UpdateResult> {
    try {
      const result = await UserRepository.update(id, data);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserHandler();
