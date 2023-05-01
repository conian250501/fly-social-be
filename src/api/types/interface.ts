import { Request } from "express";
import { User } from "../../database/entities/User";

export interface IUserAuthInfoRequest extends Request {
  user: User
}
