import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Conversation } from "./Conversation";

@Entity({ name: "messages" })
export class Message extends BaseEntity {
  @Column({ default: null })
  content: string;

  @Column({ default: null })
  file: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: "author_id" })
  author: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: "conversation_id" })
  conservation: Conversation;
}
