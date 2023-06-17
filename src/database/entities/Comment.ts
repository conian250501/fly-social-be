import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { ETypeComment } from "./interfaces/comment.interface";
import { Tweet } from "./Tweet";
import { Like } from "./Like";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {
  @Column({ default: null })
  content: string;

  @Column({ default: null })
  image: string;
  @Column({ default: null })
  video: string;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "enum", enum: ETypeComment, default: ETypeComment.Tweet })
  type: ETypeComment;

  @ManyToOne(() => Tweet, (tweet) => tweet.comments, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "tweet_id",
  })
  tweet: Tweet;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];
}
