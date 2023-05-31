import { DataTypes, Model, Sequelize } from "sequelize";

class User extends Model {
  declare uid: number;
}

const userInit = (sequelize: Sequelize) =>
  User.init(
    {
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      tableName: "users",
      sequelize: sequelize, // this bit is important
    }
  );

export { User, userInit };

