import { Router } from "express";
import IRouter from "./interface/IRouter";
import authMiddleware from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "./response";
import { routerHelper, schemas } from "../helpers/router.helper";
import userHandler from "../handlers/user.handler";

const router = Router();
class UserRouter implements IRouter {
  get routes() {
    router.get(
      "/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;
          const user = await userHandler.getById(Number(id));
          return successResponse(res, user);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new UserRouter();
