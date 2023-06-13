import { Response, Router } from "express";
import IRouter from "./interface/IRouter";
import authMiddleware from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "./response";
import storageTweetHandler from "../handlers/storageTweet.handler";
import { IUserAuthInfoRequest } from "../types/interface";
import { routerHelper, schemas } from "../helpers/router.helper";

const router = Router();
class StorageTweetRouter implements IRouter {
  get routes() {
    router.post(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.saveTweetBody),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { tweetId } = req.body;
          await storageTweetHandler.saveTweet(tweetId, req.user.id);
          return successResponse(res, {
            message: `Saved tweet into your storage successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.delete(
      "/:tweetId",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.unSaveTweetParams),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { tweetId } = req.params;
          await storageTweetHandler.unSaveTweet(Number(tweetId), req.user.id);
          return successResponse(res, {
            message: `Unsaved tweet in your storage successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new StorageTweetRouter();
