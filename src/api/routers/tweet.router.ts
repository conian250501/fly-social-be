import { Response, Router } from "express";
import multer from "multer";
import tweetHandler from "../handlers/tweet.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import { IUserAuthInfoRequest } from "../types/interface";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import { ETypeLike } from "../../database/entities/interfaces/like.interface";
import { ETweetStatus } from "../../database/entities/interfaces/tweet.interface";

const router = Router();
const uploader = multer({
  storage: multer.diskStorage({}),
});

class TweetRouter implements IRouter {
  get routes() {
    router.get("/", async (req, res) => {
      try {
        const { limit, page } = req.query;
        const tweets = await tweetHandler.getAll({
          limit: Number(limit),
          page: Number(page),
        });
        return successResponse(res, tweets);
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    router.get(
      "/following",
      authMiddleware.authToken,
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { page, limit } = req.query;
          const tweets = await tweetHandler.getAllFollowing(req.user.id, {
            limit: Number(limit),
            page: Number(page),
          });
          return successResponse(res, tweets);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.get(
      "/get-by-user/:userId",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.getAllTweetsByUserParams),
      routerHelper.validateQuery(schemas.getAllTweetsByUserQuery),
      async (req, res) => {
        try {
          const { userId } = req.params;
          const { page, limit, status } = req.query;
          const tweets = await tweetHandler.getAllByUser(Number(userId), {
            limit: Number(limit),
            page: Number(page),
            status: status as ETweetStatus,
          });

          return successResponse(res, tweets);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.get(
      "/saved/:userId",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.getAllTweetsByUserParams),
      routerHelper.validateQuery(schemas.filterQuery),
      async (req, res) => {
        try {
          const { userId } = req.params;
          const { page, limit } = req.query;
          const tweets = await tweetHandler.getAllSaved(Number(userId), {
            limit: Number(limit),
            page: Number(page),
          });
          return successResponse(res, tweets);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.get(
      "/liked/:userId",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.getAllTweetsByUserParams),
      routerHelper.validateQuery(schemas.filterQuery),
      async (req, res) => {
        try {
          const { userId } = req.params;
          const { page, limit } = req.query;
          const tweets = await tweetHandler.getAllLiked(Number(userId), {
            limit: Number(limit),
            page: Number(page),
          });
          return successResponse(res, tweets);
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
    router.delete(
      "/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;
          await tweetHandler.delete(Number(id));
          return successResponse(res, {
            message: `Deleted tweet successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.post(
      "/:id/like",
      authMiddleware.authToken,
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { id } = req.params;
          const newLike = await tweetHandler.like({
            ...req.body,
            type: ETypeLike.Tweet,
            tweetId: id,
            userId: req.user.id,
          });
          return successResponse(res, newLike);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.post(
      "/:id/dislike",
      authMiddleware.authToken,
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { id } = req.params;
          const newLike = await tweetHandler.dislike(
            ETypeLike.Tweet,
            Number(id)
          );
          return successResponse(res, newLike);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    return router;
  }
}

export default new TweetRouter();
