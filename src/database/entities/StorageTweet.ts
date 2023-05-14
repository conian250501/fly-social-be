import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity({ name: "storage_tweets" })
export class StorageTweet extends BaseEntity {
  @OneToOne(() => Tweet, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "tweet_id" })
  tweet: Tweet;

  @ManyToOne(() => User, (user) => user.storageTweets, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
