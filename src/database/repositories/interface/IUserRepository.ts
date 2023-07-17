import { DeleteResult, UpdateResult } from "typeorm";
import { TypeAuth, User } from "../../entities/User";
import { IBaseFilter } from "../../../api/common/interface";
import { EUserStatus } from "../../../database/entities/interfaces/user.interface";
export interface IFilterGetUsers extends IBaseFilter {
  name?: string;
  status?: EUserStatus;
  verified?: string;
  adminId?: number;
}
export default interface IUserRepository {
  getByEmail(email: string): Promise<User>;
  getById(id: number): Promise<User>;
  getAllUserFollowing(userId: number): Promise<User[]>;
  getAllUserFollowers(userId: number): Promise<User[]>;
  getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User>;
  getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User>;
  getAccountFacebook(typeAuth: TypeAuth, facebookId: string): Promise<User>;
  getAccountGithub(typeAuth: TypeAuth, githubId: string): Promise<User>;
  create(data: User): Promise<User>;
  update(id: number, data: User): Promise<UpdateResult>;
  getAccountLocalById(id: number): Promise<User>;
  getAll(filter: IFilterGetUsers): Promise<[User[], number]>;
  getUserFollowedYet(
    userId: number,
    ids: number[],
    filter: IFilterGetUsers
  ): Promise<[User[], number]>;
  softDelete(id: number): Promise<DeleteResult>;
  restore(id: number): Promise<DeleteResult>;
  delete(id: number): Promise<DeleteResult>;
}
