import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { StorageTweet } from "./StorageTweet";
import { User } from "./User";
import { ETweetStatus } from "./interfaces/tweet.interface";

@Entity({ name: "tweets" })
export class Tweet extends BaseEntity {
  @Column({ type: "enum", enum: ETweetStatus, default: ETweetStatus.New })
  status: ETweetStatus;

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

  @OneToMany(() => Like, (like) => like.tweet)
  likes: Like[];

  @OneToMany(() => Comment, (like) => like.tweet)
  comments: Comment[];

  @Column({ name: "is_private", default: false })
  isPrivate: boolean;

  @OneToMany(() => StorageTweet, (storage) => storage.tweet)
  storageTweets: StorageTweet[];
}
