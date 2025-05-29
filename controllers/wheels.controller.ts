import { HttpStatusCode } from "axios";
import { SendResponse } from "../utils/helpers";
import WheelsService from "../services/wheels.service";

class WheelsControllerClass {
  async getUniqueWheels(req: any, res: any) {
    try {
      const uniqueWheels = await WheelsService.getUniqueWheels();
      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        data: uniqueWheels,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.BadRequest,
        message: error.message,
      });
    }
  }
}

const WheelsController = new WheelsControllerClass();
export default WheelsController;
