import * as dotenv from "dotenv";

dotenv.config();

interface IConfig{
  SERVER_PORT: string;
  NODE_ENV:string;
}

export const config: IConfig = {
  SERVER_PORT: process.env.PORT || '',
  NODE_ENV: process.env.NODE_ENV || ''
}