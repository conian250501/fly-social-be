import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Message } from "./Messages";

@Entity({ name: "conversations" })
export class Conversation extends BaseEntity {
  @ManyToOne(() => User, (user) => user.conversationsSender, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @ManyToOne(() => User, (user) => user.conversationsReceiver, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "receiver_id" })
  receiver: User;

  @OneToMany(() => Message, (message) => message.conservation)
  messages: Message[];
}
