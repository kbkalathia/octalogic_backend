import { HttpStatusCode } from "axios";
import { SendResponse } from "../utils/helpers";
import { Messages } from "../utils/messages";
import BookingService from "../services/bookings.service";

class BookingsControllerClass {
  async createBooking(req: any, res: any) {
    try {
      const booking = await BookingService.createBooking(req.body);
      return SendResponse({
        res,
        status: HttpStatusCode.Created,
        data: booking,
        message: Messages.Bookings.CREATE_SUCCESS,
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

const BookingsController = new BookingsControllerClass();
export default BookingsController;
