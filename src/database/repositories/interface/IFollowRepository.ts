import { DeleteResult } from "typeorm";
import { Follow } from "../../../database/entities/Follow";

export default interface IFollowRepository {
  create(data: Follow): Promise<Follow>;
  delete(id: number): Promise<DeleteResult>;
  getAllByUser(userId: number): Promise<Follow[]>;
  getAllByFollower(followerId: number): Promise<Follow[]>;
  getById(id: number): Promise<Follow>;
  getByUserAndUserFollowed(
    userId: number,
    userFollowedId: number
  ): Promise<Follow>;
}
