import { IBaseFilter } from "../../common/interface";
import { User } from "../../../database/entities/User";
import UserRepository from "../../../database/repositories/UserRepository";
import { UpdateResult } from "typeorm";
import bcrypt from "bcrypt";

export interface IFilterGetUsers extends IBaseFilter {
  name: string;
}
export interface IDataChangePwd {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUserBaseHandler {
  getAll(filter: IFilterGetUsers): Promise<{ users: User[]; total: number }>;
  updatePassword(data: IDataChangePwd, userId: number): Promise<UpdateResult>;
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
}
