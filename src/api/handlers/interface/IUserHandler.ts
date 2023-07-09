import { UpdateResult } from "typeorm";
import { TypeAuth, User } from "../../../database/entities/User";
import { IFilterGetUsers } from "../../../database/repositories/interface/IUserRepository";

export default interface IUserHandler {
  getByEmail(email: string): Promise<User>;
  getById(id: number): Promise<User>;
  getAllUserFollowing(userId: number): Promise<User[]>;
  getAllUserFollowers(userId: number): Promise<User[]>;
  create(data: User): Promise<User>;
  getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User>;
  getAccountFacebook(typeAuth: TypeAuth, facebookId: string): Promise<User>;
  getAccountGithub(typeAuth: TypeAuth, githubId: string): Promise<User>;
  getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User>;
  update(id: number, data: User): Promise<UpdateResult>;
  getAccountLocalById(id: number): Promise<User>;
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
