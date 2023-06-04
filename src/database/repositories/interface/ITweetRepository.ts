import { DeleteResult, UpdateResult } from "typeorm";
import { Tweet } from "../../entities/Tweet";

export default interface ITweetRepository {
  getAllByUser(userId: number): Promise<Tweet[]>;
  getById(id:number):Promise<Tweet>;
  create(data: Tweet): Promise<Tweet>;
  update(id: number, data: Tweet): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
