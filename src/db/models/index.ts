import { Sequelize } from "sequelize";
import { userInit } from "./user_model";

const sequelize = new Sequelize(process.env.SQL_URI ?? "");

const dbSync = async () => {
  try {
    await sequelize.sync();
    userInit(sequelize).sync();
  } catch (error: any) {
    console.log(error);
  }
};

export default dbSync;
