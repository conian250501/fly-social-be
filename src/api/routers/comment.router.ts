import { Response, Router } from "express";
import multer from "multer";
import { ETypeLike } from "../../database/entities/interfaces/like.interface";
import commentHandler from "../handlers/comment.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import { IUserAuthInfoRequest } from "../types/interface";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";

const router = Router();
const uploader = multer({
  storage: multer.diskStorage({}),
});

class CommentRouter implements IRouter {
  get routes() {
    // COMMENT FOR TWEET
    router.post(
      "/:tweetId",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.newCommentBody),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { tweetId } = req.params;
          const newComment = await commentHandler.create({
            ...req.body,
            tweetId: tweetId,
            userId: req.user.id,
          });
          return successResponse(res, newComment);
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
          const url = await commentHandler.upload(Number(id), req.file);
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
          await commentHandler.update(Number(id), req.body);

          return successResponse(res, {
            message: "Updated comment successfully",
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
          await commentHandler.delete(Number(id));
          return successResponse(res, {
            message: `Deleted comment successfully`,
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
          const newLike = await commentHandler.like({
            ...req.body,
            type: ETypeLike.Comment,
            commentId: id,
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
          const newLike = await commentHandler.dislike(
            ETypeLike.Comment,
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
export default new CommentRouter();
