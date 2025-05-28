import { Op } from "sequelize";
import BookingsModel from "../models/bookings.model";

class BookingsServiceClass {
  async createBooking(data: {
    user_id: string;
    vehicle_id: string;
    start_date: string;
    end_date: string;
  }) {
    const { vehicle_id, start_date, end_date } = data;

    const overlapping = await BookingsModel.findOne({
      where: {
        vehicle_id,
        start_date: { [Op.lte]: new Date(end_date) },
        end_date: { [Op.gte]: new Date(start_date) },
      },
    });

    if (overlapping) {
      throw new Error("Vehicle is already booked for the selected date range.");
    }

    return await BookingsModel.create(data);
  }
}

const BookingsService = new BookingsServiceClass();
export default BookingsService;
