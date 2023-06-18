import { UpdateResult } from "typeorm";
import { TypeAuth, User } from "../../database/entities/User";
import cloudinary from "cloudinary";
import UserRepository from "../../database/repositories/UserRepository";
import IUserHandler from "./interface/IUserHandler";
import FollowRepository from "../../database/repositories/FollowRepository";

class UserHandler implements IUserHandler {
  async getByEmail(email: string) {
    try {
      const user = await UserRepository.getByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getAllUserFollowing(userId: number): Promise<User[]> {
    try {
      const followings = await FollowRepository.getAllByUser(userId);

      const users: User[] = [];
      for (const follow of followings) {
        users.push(follow.follower);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getAllUserFollowers(userId: number): Promise<User[]> {
    try {
      const followings = await FollowRepository.getAllByFollower(userId);

      const users: User[] = [];
      for (const follow of followings) {
        users.push(follow.user);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }
  async create(data: User): Promise<User> {
    try {
      const newUser = await UserRepository.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const user = await UserRepository.getById(id);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountLocalById(id: number): Promise<User> {
    try {
      const user = await UserRepository.getAccountLocalById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User> {
    try {
      const user = await UserRepository.getAccountLocal(typeAuth, email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User> {
    try {
      const user = await UserRepository.getAccountGoogle(typeAuth, googleId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountFacebook(
    typeAuth: TypeAuth,
    facebookId: string
  ): Promise<User> {
    try {
      const user = await UserRepository.getAccountFacebook(
        typeAuth,
        facebookId
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountGithub(typeAuth: TypeAuth, githubId: string): Promise<User> {
    try {
      const user = await UserRepository.getAccountGithub(typeAuth, githubId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: User): Promise<UpdateResult> {
    try {
      const result = await UserRepository.update(id, data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async upload(
    id: number,
    files:
      | Express.Multer.File[]
      | {
          [fieldname: string]: Express.Multer.File[];
        }
  ): Promise<{ message: string }> {
    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const user = await UserRepository.getById(id);

      const fileList: { [key: string]: string } = {};
      for (const [key, value] of Object.entries(files)) {
        fileList[key] = value[0].path;
      }
      for (const [_key, value] of Object.entries(fileList)) {
        switch (_key) {
          case "avatar":
            const { secure_url } = await cloudinary.v2.uploader.upload(value, {
              public_id: `avatar_${user.id}`,
              use_filename: true,
              folder: `fly-social/users/${user.id}`,
            });
            await UserRepository.update(id, {
              avatar: secure_url,
            } as User);
            break;

          case "cover":
            const { secure_url: _secure_url } =
              await cloudinary.v2.uploader.upload(value, {
                public_id: `cover_${user.id}`,
                use_filename: true,
                folder: `fly-social/users/${user.id}`,
              });
            await UserRepository.update(id, {
              cover: _secure_url,
            } as User);
            break;
          default:
            break;
        }
      }

      return { message: `Upload image successfully` };
    } catch (error) {
      throw error;
    }
  }
}

export default new UserHandler();
