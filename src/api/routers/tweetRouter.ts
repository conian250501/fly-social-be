import { Response, Router } from "express";
import multer from "multer";
import tweetHandler from "../handlers/tweet.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import { IUserAuthInfoRequest } from "../types/interface";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";

const router = Router();
const uploader = multer({
  storage: multer.diskStorage({}),
});

class TweetRouter implements IRouter {
  get routes() {
    router.get("/", async (req, res) => {
      try {
        const tweets = await tweetHandler.getAll();
        return successResponse(res, tweets);
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    router.get(
      "/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const {id} = req.params
          const tweet = await tweetHandler.getById(Number(id));
          return successResponse(res, tweet);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.post(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.createTweetBody),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const newTweet = await tweetHandler.create(req.user.id, req.body);
          return successResponse(res, newTweet);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.post(
      "/upload/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      uploader.single("file"),
      async (req, res) => {
        try {
          const { id } = req.params;
          const url = await tweetHandler.upload(Number(id), req.file);
          return successResponse(res, url);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.put(
      "/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      routerHelper.validateBody(schemas.updateTweetBody),
      async (req, res) => {
        try {
          const { id } = req.params;
          await tweetHandler.update(Number(id), req.body);

          return successResponse(res, {
            message: "Updated tweet successfully",
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new TweetRouter();
