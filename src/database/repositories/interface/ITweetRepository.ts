import { DeleteResult, UpdateResult } from "typeorm";
import { Tweet } from "../../entities/Tweet";
import { IBaseFilter } from "../../../api/common/interface";

export default interface ITweetRepository {
  getAllByUser(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAllSaved(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAll(): Promise<Tweet[]>;
  getById(id: number): Promise<Tweet>;
  create(data: Tweet): Promise<Tweet>;
  update(id: number, data: Tweet): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
