import { IBaseFilter } from "../../..//common/interface";
import { Tweet } from "../../../../database/entities/Tweet";

export default interface ITweetHandler {
  getAll(filter: IBaseFilter): Promise<{ tweets: Tweet[]; total: number }>;
}
