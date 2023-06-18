import { DeleteResult, Repository } from "typeorm";
import IFollowRepository from "./interface/IFollowRepository";
import { Follow } from "../entities/Follow";
import { AppDataSource } from "../data-source";

class FollowRepository implements IFollowRepository {
  repo: Repository<Follow>;
  constructor() {
    this.repo = AppDataSource.getRepository(Follow);
  }
  create(data: Follow): Promise<Follow> {
    return this.repo.save(data);
  }
  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
  getById(id: number): Promise<Follow> {
    if (!id) return null;
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }
  getAllByUser(userId: number): Promise<Follow[]> {
    return this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        follower: true,
        user: true,
      },
    });
  }
  getAllByFollower(followerId: number): Promise<Follow[]> {
    return this.repo.find({
      where: {
        follower: {
          id: followerId,
        },
      },
      relations: {
        follower: true,
        user: true,
      },
    });
  }

  getByUserAndUserFollowed(
    userId: number,
    userFollowedId: number
  ): Promise<Follow> {
    if (!userId || !userFollowedId) return null;
    return this.repo.findOne({
      where: {
        user: {
          id: userId,
        },
        follower: {
          id: userFollowedId,
        },
      },
    });
  }
}
export default new FollowRepository();
