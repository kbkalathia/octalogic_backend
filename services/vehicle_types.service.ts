import VehicleTypesModel from "../models/vehicle_types.model";

class VehicleTypeServiceClass {
  async getVehicleTypes(wheels: string | undefined) {
    const where = wheels ? { wheels: parseInt(wheels) } : {};
    return await VehicleTypesModel.findAll({ where });
  }
}

const VehicleTypeService = new VehicleTypeServiceClass();
export default VehicleTypeService;
