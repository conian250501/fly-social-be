import { Response, Router } from "express";
import conversationHandler from "../handlers/conversation.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import { IUserAuthInfoRequest } from "../types/interface";
import userHandler from "../handlers/user.handler";

const router = Router();

class ConversationRouter implements IRouter {
  get routes() {
    router.get(
      "/user/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;
          const { limit, page } = req.query;

          const { conversations, total } = await conversationHandler.getAll(
            Number(id),
            {
              limit: Number(limit),
              page: Number(page),
            }
          );

          const totalPage = Math.ceil(total / Number(limit));
          return successResponse(res, {
            conversations,
            totalPage,
            page: Number(page),
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.get(
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
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const conservation = await conversationHandler.create(
            req.user.id,
            req.body
          );
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
