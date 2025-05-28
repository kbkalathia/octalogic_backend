import { HttpStatusCode } from "axios";
import { Messages } from "../utils/messages";
import { SendResponse } from "../utils/helpers";
import UserService from "../services/users.service";

class UsersControllerClass {
  async createUser(req: any, res: any) {
    try {
      const newUser = await UserService.createUser(req.body);
      return SendResponse({
        res,
        status: HttpStatusCode.Created,
        data: newUser,
        message: Messages.Users.CREATE_SUCCESS,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error creating user: " + error.message,
      });
    }
  }
}

const UsersController = new UsersControllerClass();
export default UsersController;
