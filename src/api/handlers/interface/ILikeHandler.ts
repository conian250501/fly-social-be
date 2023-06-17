import { Like } from "../../../database/entities/Like";

export interface IDataCreateLike extends Omit<Like, "user" | "tweet"> {
  userId: number;
  tweetId: number;
}

export default interface ILikeHandler {
  create(data: IDataCreateLike): Promise<Like>;
}
