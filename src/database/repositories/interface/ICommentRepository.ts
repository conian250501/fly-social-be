import { DeleteResult, UpdateResult } from "typeorm";
import { Comment } from "../../entities/Comment";

export default interface ICommentRepository {
  create(data: Comment): Promise<Comment>;
  delete(id: number): Promise<DeleteResult>;
  update(id: number, data: Comment): Promise<UpdateResult>;
  getById(id: number): Promise<Comment>;
}
