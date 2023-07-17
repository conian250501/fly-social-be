import { UpdateResult } from "typeorm";
import { TypeAuth, User } from "../../../database/entities/User";
import { IFilterGetUsers } from "../../../database/repositories/interface/IUserRepository";

export default interface IUserHandler {
  getAllUserFollowing(userId: number): Promise<User[]>;
  getAllUserFollowers(userId: number): Promise<User[]>;
  upload(
    id: number,
    files:
      | Express.Multer.File[]
      | {
          [fieldname: string]: Express.Multer.File[];
        }
  ): Promise<{ message: string }>;
  getAllFollowingYet(
    userId: number,
    filter: IFilterGetUsers
  ): Promise<{ users: User[]; total: number }>;
}
