import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Message } from "./Messages";
import { User } from "./User";

@Entity({ name: "conversations" })
export class Conversation extends BaseEntity {
  @ManyToOne(() => User, (user) => user.conversationsHost, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "host_id" })
  host: User;

  @ManyToOne(() => User, (user) => user.conversationsParticipant, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "participant_id" })
  participant: User;

  @OneToMany(() => Message, (message) => message.conservation)
  messages: Message[];
}
