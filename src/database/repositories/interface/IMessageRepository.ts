import { Message } from "../../entity/Message";

export default interface IMessageRepository {
  create(data: Message): Promise<Message>;
}
