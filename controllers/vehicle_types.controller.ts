import { HttpStatusCode } from "axios";
import { SendResponse } from "../utils/helpers";
import { Messages } from "../utils/messages";
import VehicleTypesService from "../services/vehicle_types.service";

class VehicleTypesControllerClass {
  async getVehicleTypes(req: any, res: any) {
    try {
      const wheels = req.query.wheels;
      const vehicleTypes = await VehicleTypesService.getVehicleTypes(wheels);
      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        data: vehicleTypes,
        message: Messages.Vehicle_Types.LIST,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error fetching vehicle types: " + error.message,
      });
    }
  }
}

const VehicleTypesController = new VehicleTypesControllerClass();
export default VehicleTypesController;
