import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import BookingsModel from "./bookings.model";

const UsersModel = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Users",
  }
);

UsersModel.hasMany(BookingsModel, { foreignKey: "user_id", as: "bookings" });
BookingsModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "user" });

export default UsersModel;
