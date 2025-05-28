import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import VehiclesModel from "./vehicals.model";

const VehicleTypesModel = sequelize.define(
  "Vehicle_Types",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    wheels: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Vehicle_Types",
  }
);

VehicleTypesModel.hasMany(VehiclesModel, {
  foreignKey: "vehicle_type_id",
  as: "vehicles",
});
VehiclesModel.belongsTo(VehicleTypesModel, {
  foreignKey: "vehicle_type_id",
  as: "vehicleType",
});

export default VehicleTypesModel;
