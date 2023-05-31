import { Sequelize } from "sequelize";
import { userInit } from "./user_model";

const sequelize = new Sequelize(
  "mysql://root:Motunrayo21@@localhost:3306/firstdatabase"
);

const dbSync = async () => {
  try {
    await sequelize.sync();
    userInit(sequelize).sync();
  } catch (error: any) {
    console.log(error);
  }
};

export default dbSync;
