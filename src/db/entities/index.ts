import dataSource from "..";
import { User } from "./user.entity";

const entities = [User];
export const db = {
  users: dataSource.getRepository(User),
};
export default entities;
