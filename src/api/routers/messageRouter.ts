import { Response, Router } from "express";
import messageHandler from "../handlers/message.handler";
import authMiddleware from "../middlewares/auth.middleware";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import { routerHelper, schemas } from "../helpers/router.helper";
import { IUserAuthInfoRequest } from "../types/interface";

const router = Router();
class MessageRouter implements IRouter {
  get routes() {
    router.post(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.newMessage),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const newMessage = await messageHandler.create({
            ...req.body,
            authorId: req.user.id,
          });

          return successResponse(res, newMessage);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new MessageRouter();
