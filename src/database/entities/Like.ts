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
import { Comment } from "./Comment";

@Entity({ name: "likes" })
export class Like extends BaseEntity {
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "enum", enum: ETypeLike, default: ETypeLike.Tweet })
  type: ETypeLike;

  @ManyToOne(() => Tweet, (tweet) => tweet.likes, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "tweet_id" })
  tweet: Tweet;

  @ManyToOne(() => Comment, (comment) => comment.likes, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "comment_id" })
  comment: Comment;
}
