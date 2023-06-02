import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

const initializeDB = new DataSource({
  type: "postgres",
  // host: process.env.MYSQL_HOST,
  // port: Number(process.env.MYSQL_PORT),
  // username: process.env.MYSQL_USERNAME,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
  url: process.env.PGURL,
  ssl: true,
  entities: [User],
  synchronize: true,
  logging: false,
});

export default initializeDB;
