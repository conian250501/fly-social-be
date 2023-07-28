import { Router } from "express";
import conversationHandler from "../handlers/conversation.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";

const router = Router();

class ConversationRouter implements IRouter {
  get routes() {
    router.post(
      "/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;
          const conservation = await conversationHandler.getById(Number(id));
          return successResponse(res, conservation);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.post(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.newConversation),
      async (req, res) => {
        try {
          const conservation = await conversationHandler.create(req.body);
          return successResponse(res, conservation);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new ConversationRouter();
