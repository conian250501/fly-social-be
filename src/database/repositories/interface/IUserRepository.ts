import { TypeAuth, User } from "../../entities/User"

export default interface IUserRepository{
  getByEmail(email:string): Promise<User>;
  getById(id:number): Promise<User>;
  getAccountGoogle(typeAuth:TypeAuth, googleId:string):Promise<User>;
  create(data:User): Promise<User>;
}