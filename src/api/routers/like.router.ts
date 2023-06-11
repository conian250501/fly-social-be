import { Router } from "express";
import IRouter from "./interface/IRouter";
import authMiddleware from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "./response";
import likeHandler from "../handlers/like.handler";
import { routerHelper, schemas } from "../helpers/router.helper";

const router = Router();
class LikeRouter implements IRouter {
  get routes() {
    router.post(
      "/",
      routerHelper.validateBody(schemas.likeBody),
      authMiddleware.authToken,
      async (req, res) => {
        try {
          const newLike = await likeHandler.create(req.body);
          return successResponse(res, newLike);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new LikeRouter();
