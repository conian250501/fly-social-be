import { Response, Router } from "express";
import IRouter from "./interface/IRouter";
import authMiddleware from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "./response";
import commentHandler from "../handlers/comment.handler";
import { IUserAuthInfoRequest } from "../types/interface";
import { routerHelper, schemas } from "../helpers/router.helper";

const router = Router();
class CommentRouter implements IRouter {
  get routes() {
    router.post(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.createCommentBody),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const newComment = await commentHandler.create({
            ...req.body,
            userId: req.user.id,
          });
          return successResponse(res, newComment);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}
export default new CommentRouter();
