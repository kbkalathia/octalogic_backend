import { Sequelize } from "sequelize";
import VehicleTypesModel from "../models/vehicle_types.model";

class WheelsServiceClass {
  async getUniqueWheels(): Promise<number[]> {
    const results = await VehicleTypesModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("wheels")), "wheels"],
      ],
      raw: true,
    });

    return results.map((item: any) => Number(item.wheels));
  }
}

const WheelsService = new WheelsServiceClass();
export default WheelsService;
