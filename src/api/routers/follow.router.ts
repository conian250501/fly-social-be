import { Response, Router } from "express";
import IRouter from "./interface/IRouter";
import authMiddleware from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "./response";
import followHandler from "../handlers/follow.handler";
import { IUserAuthInfoRequest } from "../types/interface";
import { routerHelper } from "../helpers/router.helper";
import { schemas } from "../helpers/router.helper";

const router = Router();
class FollowRouter implements IRouter {
  get routes() {
    router.post(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.followUserBody),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { userFollowedId } = req.body;
          await followHandler.follow({
            userId: req.user.id,
            userFollowedId: userFollowedId,
          });

          return successResponse(res, { message: `Follow user successfully` });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.put(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.unFollowUserBody),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { userFollowedId } = req.body;
          await followHandler.unFollow({
            userId: req.user.id,
            userFollowedId: userFollowedId,
          });

          return successResponse(res, {
            message: `UnFollow user successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new FollowRouter();
