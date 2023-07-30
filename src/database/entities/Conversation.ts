import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Message } from "./Messages";
import { User } from "./User";

@Entity({ name: "conversations" })
export class Conversation extends BaseEntity {
  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable({
    name: "conversations_participants",
    joinColumn: {
      name: "conversation_id",
    },
    inverseJoinColumn: {
      name: "participant_id",
    },
  })
  participants: User[];

  @OneToMany(() => Message, (message) => message.conservation)
  messages: Message[];
}
