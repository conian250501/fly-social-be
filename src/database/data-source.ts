import { DataSource } from "typeorm";
import { Environment } from "../config/enviroment";
import { User } from "./entities/User";

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
    User
  ],
  migrations: [__dirname + '/migrations/**/*.ts'],
  subscribers:[]
})