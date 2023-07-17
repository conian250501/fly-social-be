import { DeleteResult } from "typeorm";
import { UserBaseHandler } from "../base/userBaseHandler";
import IUserHandler from "./interface/IUserHandler";
import UserRepository from "../../../database/repositories/UserRepository";

class UserHandler extends UserBaseHandler implements IUserHandler {
  async delete(id: number): Promise<DeleteResult> {
    try {
      const result = UserRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: number): Promise<DeleteResult> {
    try {
      const result = await UserRepository.softDelete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number): Promise<DeleteResult> {
    try {
      const result = await UserRepository.restore(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export default new UserHandler();
