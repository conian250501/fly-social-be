import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
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

  @Column({ name: "is_group", default: false })
  isGroup: boolean;

  @Column({ name: "group_name", default: null })
  groupName: string;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
