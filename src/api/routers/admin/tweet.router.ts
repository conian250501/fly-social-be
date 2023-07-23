import { Router } from "express";
import IRouter from "../interface/IRouter";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import { errorResponse, successResponse } from "../response";
import tweetHandler from "../../handlers/admin/tweet.handler";
import { routerHelper, schemas } from "../../helpers/router.helper";

const router = Router();

class TweetRouter implements IRouter {
  get routes() {
    router.get(
      "/",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      async (req, res) => {
        try {
          const { limit, page } = req.query;
          const { tweets, total } = await tweetHandler.getAll({
            limit: Number(limit),
            page: Number(page),
          });
          const totalPage = Math.ceil(total / Number(limit));

          return successResponse(res, {
            tweets,
            page: Number(page),
            totalPage,
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
          const tweet = await tweetHandler.getById(Number(id));
          return successResponse(res, tweet);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new TweetRouter();
