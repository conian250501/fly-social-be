import { DeleteResult, UpdateResult } from "typeorm";
import { Tweet } from "../../../database/entities/Tweet";

export default interface ITweetHandler {
  getAllByUser(userId: number): Promise<Tweet[]>;
  create(userId:number,data: Tweet): Promise<Tweet>;
  update(id: number, data: Tweet): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  upload(id:number,file: Express.Multer.File):Promise<string>;
}