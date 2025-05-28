import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import BookingsModel from "./bookings.model";

const VehiclesModel = sequelize.define(
  "Vehicle",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Vehicles",
  }
);

VehiclesModel.hasMany(BookingsModel, {
  foreignKey: "vehicle_id",
  as: "bookings",
});
BookingsModel.belongsTo(VehiclesModel, {
  foreignKey: "vehicle_id",
  as: "vehicle",
});

export default VehiclesModel;
