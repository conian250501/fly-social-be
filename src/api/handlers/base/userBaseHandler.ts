import { IBaseFilter } from "../../common/interface";
import { User } from "../../../database/entities/User";
import UserRepository from "../../../database/repositories/UserRepository";

export interface IFilterGetUsers extends IBaseFilter {
  name: string;
}

export interface IUserBaseHandler {
  getAll(filter: IFilterGetUsers): Promise<{ users: User[]; total: number }>;
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
}
