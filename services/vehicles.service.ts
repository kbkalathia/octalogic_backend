import VehicleModel from "../models/vehicles.model";

class VehiclesServiceClass {
  async getVehiclesByType(vehicleTypeId: string) {
    return await VehicleModel.findAll({
      where: { vehicle_type_id: vehicleTypeId },
    });
  }
}

const VehiclesService = new VehiclesServiceClass();
export default VehiclesService;
