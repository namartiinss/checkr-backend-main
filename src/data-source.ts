import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tasks } from "./entity/Tasks";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Tasks, User],
  migrations: [],
  subscribers: [],
});
