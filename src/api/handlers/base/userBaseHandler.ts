import { IBaseFilter } from "../../common/interface";
import { TypeAuth, User } from "../../../database/entities/User";
import UserRepository from "../../../database/repositories/UserRepository";
import { UpdateResult } from "typeorm";
import bcrypt from "bcrypt";
import { EUserStatus } from "../../../database/entities/interfaces/user.interface";

export interface IFilterGetUsers extends IBaseFilter {
  name?: string;
  status?: EUserStatus;
  verified?: string;
  currentUserId?: number;
}
export interface IDataChangePwd {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUserBaseHandler {
  getAll(filter: IFilterGetUsers): Promise<{ users: User[]; total: number }>;
  updatePassword(data: IDataChangePwd, userId: number): Promise<UpdateResult>;
  getByEmail(email: string): Promise<User>;
  getById(id: number): Promise<User>;
  create(data: User): Promise<User>;
  getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User>;
  getAccountFacebook(typeAuth: TypeAuth, facebookId: string): Promise<User>;
  getAccountGithub(typeAuth: TypeAuth, githubId: string): Promise<User>;
  getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User>;
  update(id: number, data: User): Promise<UpdateResult>;
  getAccountLocalById(id: number): Promise<User>;
}

export class UserBaseHandler implements IUserBaseHandler {
  async getAll(
    filter: IFilterGetUsers
  ): Promise<{ users: User[]; total: number }> {
    try {
      const [users, total] = await UserRepository.getAll(filter);
      return { users, total };
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(
    data: IDataChangePwd,
    userId: number
  ): Promise<UpdateResult> {
    try {
      const { currentPassword, newPassword } = data;
      const user = await UserRepository.getAccountLocalById(userId);

      if (!user) {
        throw new Error(
          `User login different username and password so don't have password`
        );
      }

      const isValidCurrentPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isValidCurrentPassword) {
        throw new Error("Password incorrect");
      }

      const isValidPassword = await bcrypt.compare(newPassword, user.password);
      if (isValidPassword) {
        throw new Error("You have used this password before");
      }

      const passwordHashed = await bcrypt.hash(newPassword, 10);
      const result = await UserRepository.update(user.id, {
        password: passwordHashed,
      } as User);

      return result;
    } catch (error) {
      throw error;
    }
  }

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
