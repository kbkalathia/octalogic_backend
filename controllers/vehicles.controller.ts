import { HttpStatusCode } from "axios";
import { SendResponse } from "../utils/helpers";
import { Messages } from "../utils/messages";
import VehiclesService from "../services/vehicles.service";

class VehiclesControllerClass {
  async getVehiclesByType(req: any, res: any) {
    try {
      const { typeId } = req.params;
      const vehicles = await VehiclesService.getVehiclesByType(typeId);
      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        data: vehicles,
        message: Messages.Vehicles.LIST,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error fetching vehicles: " + error.message,
      });
    }
  }
}

const VehiclesController = new VehiclesControllerClass();
export default VehiclesController;
