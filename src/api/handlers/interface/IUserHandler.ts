import { UpdateResult } from "typeorm";
import { TypeAuth, User } from "../../../database/entities/User";

export default interface IUserHandler {
  getByEmail(email: string): Promise<User>;
  getById(id: number): Promise<User>;
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
}
