import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Entity({ name: "tweets" })
export class Tweet extends BaseEntity {
  @Column({ default: null })
  content: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  video: string;

  @ManyToOne(() => User, (user) => user.tweets, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(() => Like, (like) => like.tweets)
  likes: Like[];

  @ManyToMany(() => Comment, (like) => like.tweets)
  comments: Comment[];

  @Column({ name: "is_private", default: false })
  isPrivate: boolean;
}
