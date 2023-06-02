import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

const initializeDB = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User],
    synchronize: true,
    logging: false,
  });

//   AppDataSource.initialize()
//     .then(() => {
//       console.log("Connected to mySql");
//       // here you can start to work with your database
//     })
//     .catch((error) => console.log(error));
// };

export default initializeDB;
