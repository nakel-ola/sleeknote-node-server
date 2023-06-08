import "reflect-metadata";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQLURL,
  entities: [__dirname + "/entities/*.entity.ts"],
  synchronize: true,
  logging: false,
});

export default dataSource;
