import { Message } from "../../entities/Messages";

export default interface IMessageRepository {
  create(data: Message): Promise<Message>;
}
