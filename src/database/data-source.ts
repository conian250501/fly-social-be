import { DataSource } from "typeorm";
import { Environment } from "../config/enviroment";
import { User } from "./entities/User";
import { Tweet } from "./entities/Tweet";
import { Like } from "./entities/Like";
import { Comment } from "./entities/Comment";
import { StorageTweet } from "./entities/StorageTweet";
import { Follow } from "./entities/Follow";

Environment.setup();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER || "conian",
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    User,
    Tweet,
    Like,
    Comment,
    StorageTweet,
    Follow
  ],
  migrations: [__dirname + '/migrations/**/*.ts'],
  subscribers:[]
})