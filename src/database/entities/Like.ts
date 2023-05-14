import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { ETypeLike } from "./interfaces/like.interface";
import { Tweet } from "./Tweet";

@Entity({ name: "likes" })
export class Like extends BaseEntity {
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "enum", enum: ETypeLike, default: ETypeLike.Tweet })
  type: ETypeLike;

  @Column({ name: "type_like_id" })
  typeId: number;

  @ManyToMany(() => Tweet, (tweet) => tweet.likes, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({
    name: "tweets_likes",
    joinColumn: {
      name: "like_id",
    },
    inverseJoinColumn: {
      name: "tweet_id",
    },
  })
  tweets: Tweet[];
}
