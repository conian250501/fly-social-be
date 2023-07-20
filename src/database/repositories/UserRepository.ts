import {
  DeleteResult,
  ILike,
  In,
  Not,
  Repository,
  UpdateResult,
} from "typeorm";
import { AppDataSource } from "../data-source";
import { TypeAuth, User } from "../entities/User";
import IUserRepository, { IFilterGetUsers } from "./interface/IUserRepository";

class UserRepository implements IUserRepository {
  repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  getAll({
    page,
    limit,
    name,
    status,
    verified,
    adminId,
  }: IFilterGetUsers): Promise<[User[], number]> {
    return this.repo.findAndCount({
      where: {
        name: name ? ILike(`%${name}%`) : undefined,
        status: status ? status : undefined,
        verified: verified === "true" ? true : false,
        id: adminId ? Not(adminId) : undefined,
      },
      take: limit ? limit : null,
      skip: page ? (page - 1) * limit : null,
      relations: {
        followers: {
          user: true,
          follower: true,
        },
        followings: {
          user: true,
          follower: true,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  getByEmail(email: string): Promise<User> {
    return this.repo.findOne({
      where: { email },
    });
  }

  getById(id: number): Promise<User> {
    return this.repo.findOne({
      where: { id },
      relations: {
        tweets: true,
        likes: true,
        storageTweets: true,
        comments: true,
        followers: {
          user: true,
          follower: true,
        },
        followings: {
          user: true,
          follower: true,
        },
      },
    });
  }

  getAllUserFollowing(userId: number): Promise<User[]> {
    return this.repo.find({
      where: {
        followings: {
          user: {
            id: userId,
          },
        },
      },
      relations: {
        followers: {
          user: true,
          follower: true,
        },
        followings: {
          user: true,
          follower: true,
        },
      },
    });
  }
  getAllUserFollowers(userId: number): Promise<User[]> {
    return this.repo.find({
      where: {
        followers: {
          follower: {
            id: userId,
          },
        },
      },
      relations: {
        followers: {
          user: true,
          follower: true,
        },
        followings: {
          user: true,
          follower: true,
        },
      },
    });
  }
  getAccountLocalById(id: number): Promise<User> {
    return this.repo.findOne({
      where: {
        id: id,
        typeAuth: TypeAuth.LOCAL,
      },
    });
  }

  getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth,
        email,
      },
    });
  }

  getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth: typeAuth,
        googleId: googleId,
      },
    });
  }

  getAccountFacebook(typeAuth: TypeAuth, facebookId: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth,
        facebookId,
      },
    });
  }

  getAccountGithub(typeAuth: TypeAuth, githubId: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth,
        githubId,
      },
    });
  }

  create(data: User): Promise<User> {
    return this.repo.save(data);
  }

  update(id: number, data: User): Promise<UpdateResult> {
    return this.repo.update(id, data);
  }
  getUserFollowedYet(
    userId: number,
    ids: number[],
    { page, limit, name }: IFilterGetUsers
  ): Promise<[User[], number]> {
    return this.repo.findAndCount({
      where: {
        id: Not(In([userId, ...ids])),
        name: name ? ILike(`%${name}%`) : undefined,
      },
      relations: {
        followers: {
          user: true,
          follower: true,
        },
        followings: {
          user: true,
          follower: true,
        },
      },
      take: limit ? limit : null,
      skip: page ? (page - 1) * limit : null,
    });
  }
  softDelete(id: number): Promise<DeleteResult> {
    return this.repo.softDelete(id);
  }
  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
  restore(id: number): Promise<DeleteResult> {
    return this.repo.restore(id);
  }
}

export default new UserRepository();
