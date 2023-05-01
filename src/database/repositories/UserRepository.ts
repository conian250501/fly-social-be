import { Repository } from "typeorm";
import { User } from "../entities/User";
import IUserRepository from "./interface/IUserRepository";
import { AppDataSource } from "../data-source";

class UserRepository implements IUserRepository{
  repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  getByEmail(email: string): Promise<User> {
    return this.repo.findOne({
      where:{email}
    })
  }

  create(data: User): Promise<User> {
    return this.repo.save(data);
  }
}

export default new UserRepository();