import { DeleteResult } from "typeorm";

export default interface IUserHandler {
  delete(id: number): Promise<DeleteResult>;
  softDelete(id: number): Promise<DeleteResult>;
  restore(id: number): Promise<DeleteResult>;
}
