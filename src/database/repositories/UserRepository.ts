import { Repository } from "typeorm";
import { TypeAuth, User } from "../entities/User";
import IUserRepository from "./interface/IUserRepository";
import { AppDataSource } from "../data-source";

class UserRepository implements IUserRepository {
  repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  getByEmail(email: string): Promise<User> {
    return this.repo.findOne({
      where: { email }
    });
  }

  getById(id: number): Promise<User> {
    return this.repo.findOne({
      where: { id }
    });
  }

  getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth,
        email
      }
    })
  }

  getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth: typeAuth,
        googleId: googleId
      }

    })
  }

  getAccountFacebook(typeAuth: TypeAuth, facebookId: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth,
        facebookId
      }
    })
  }

  getAccountGithub(typeAuth: TypeAuth, githubId: string): Promise<User> {
    return this.repo.findOne({
      where: {
        typeAuth,
        githubId
      }
    })
  }

  create(data: User): Promise<User> {
    return this.repo.save(data);
  }

}

export default new UserRepository();