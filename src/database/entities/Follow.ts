import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity({ name: "follows" })
export class Follow extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User, (user) => user.followings, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "follower_id" })
  follower: User;
}
