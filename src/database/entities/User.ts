import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Follow } from "./Follow";
import { Like } from "./Like";
import { StorageTweet } from "./StorageTweet";
import { Tweet } from "./Tweet";

export enum TypeAuth {
  LOCAL = "local",
  GOOGLE = "google",
  FACEBOOK = "facebook",
  GITHUB = "github",
}

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({ default: null })
  avatar: string;
  @Column({ default: null })
  cover: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  nickname: string;

  @Column({ default: null })
  phone: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  website: string;

  @Column({ name: "birth_date", default: null })
  birthDate: string;

  @Column({ default: null })
  password: string;

  @Column({
    name: "type_auth",
    type: "enum",
    enum: TypeAuth,
    default: TypeAuth.LOCAL,
  })
  typeAuth: TypeAuth;

  @Column({ name: "google_id", default: null })
  googleId: string;

  @Column({ name: "facebook_id", default: null })
  facebookId: string;

  @Column({ name: "github_id", default: null })
  githubId: string;

  @Column({ default: "user" })
  role: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @OneToMany(() => StorageTweet, (storage) => storage.user)
  storageTweets: StorageTweet[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Like[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.user)
  followings: Follow[];
}
