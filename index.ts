import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UsersController from "./controllers/users.controller";
import VehicleTypesController from "./controllers/vehicle_types.controller";
import VehiclesController from "./controllers/vehicles.controller";
import BookingsController from "./controllers/bookings.controller";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Users
app.post("/api/create-user", UsersController.createUser);

// Vehicle Types
app.get("/api/vehicle-types", VehicleTypesController.getVehicleTypes);

// Vehicle
app.get("/api/vehicles/:typeId", VehiclesController.getVehiclesByType);

// Bookings
app.post("/api/bookings", BookingsController.createBooking);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
