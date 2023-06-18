import { Follow } from "../../database/entities/Follow";
import IFollowHandler, { IDataFollow } from "./interface/IFollowHandler";
import FollowRepository from "../../database/repositories/FollowRepository";
import { DeleteResult } from "typeorm";
import UserRepository from "../../database/repositories/UserRepository";

class FollowHandler implements IFollowHandler {
  async follow({ userId, userFollowedId }: IDataFollow): Promise<Follow> {
    try {
      const user = await UserRepository.getById(userId);
      const userFollowing = await UserRepository.getById(userFollowedId);

      const follow = await FollowRepository.getByUserAndUserFollowed(
        userId,
        userFollowedId
      );

      if (follow) {
        throw new Error("You followed this user");
      }

      const newFollow = await FollowRepository.create({
        user: user,
        follower: userFollowing,
      } as Follow);
      return newFollow;
    } catch (error) {
      throw error;
    }
  }
  async unFollow({
    userId,
    userFollowedId,
  }: IDataFollow): Promise<DeleteResult> {
    try {
      const follow = await FollowRepository.getByUserAndUserFollowed(
        userId,
        userFollowedId
      );
      const result = await FollowRepository.delete(follow.id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export default new FollowHandler();
