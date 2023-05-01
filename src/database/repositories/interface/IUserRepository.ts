import { User } from "../../entities/User"

export default interface IUserRepository{
  getByEmail(email:string): Promise<User>;
  create(data:User): Promise<User>;
}