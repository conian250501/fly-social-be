import { User } from "../../../database/entities/User";

export default interface IUserHandler{
  getByEmail(email:string): Promise<User>;
  create(data:User): Promise<User>;
}