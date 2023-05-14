import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { ETypeComment } from "./interfaces/comment.interface";
import { Tweet } from "./Tweet";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column({ type: "enum", enum: ETypeComment, default: ETypeComment.Tweet })
  type: ETypeComment;

  @Column({ name: "type_comment_id" })
  typeId: number;

  @ManyToMany(() => Tweet, (tweet) => tweet.comments, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({
    name: "tweets_comments",
    joinColumn: {
      name: "comment_id"
    },
    inverseJoinColumn: {
      name: "tweet_id"
    }
  })
  tweets: Tweet[];
}
