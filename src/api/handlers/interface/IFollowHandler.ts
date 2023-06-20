import { DeleteResult } from "typeorm";
import { Follow } from "../../../database/entities/Follow";

export interface IDataFollow {
  userId: number;
  userFollowedId: number;
}
export default interface IFollowHandler {
  follow(data: IDataFollow): Promise<Follow>;
  unFollow(data: IDataFollow): Promise<DeleteResult>;
}
