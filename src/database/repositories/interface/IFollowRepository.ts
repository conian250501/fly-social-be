import { DeleteResult } from "typeorm";
import { Follow } from "../../../database/entities/Follow";

export default interface IFollowRepository {
  create(data: Follow): Promise<Follow>;
  delete(id: number): Promise<DeleteResult>;
  getById(id: number): Promise<Follow>;
  getByUserAndUserFollowed(
    userId: number,
    userFollowedId: number
  ): Promise<Follow>;
}
