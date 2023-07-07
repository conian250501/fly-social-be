import { Response, Router } from "express";
import IRouter from "./interface/IRouter";
import authMiddleware from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "./response";
import { routerHelper, schemas } from "../helpers/router.helper";
import userHandler from "../handlers/user.handler";
import multer from "multer";
import { IUserAuthInfoRequest } from "../types/interface";

const router = Router();
const uploader = multer({
  storage: multer.diskStorage({}),
});

class UserRouter implements IRouter {
  get routes() {
    router.get("/", authMiddleware.authToken, async (req, res) => {
      try {
        const { name, limit, page } = req.query;
        const { users, total } = await userHandler.getAll({
          name: String(name),
          limit: Number(limit),
          page: Number(page),
        });
        const totalPage = Math.ceil(total / Number(limit));
        return successResponse(res, { users, page: Number(page), totalPage });
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
          const { id } = req.params;
          const user = await userHandler.getById(Number(id));
          return successResponse(res, user);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.put(
      "/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      routerHelper.validateBody(schemas.updateProfileBody),
      async (req, res) => {
        try {
          const { id } = req.params;
          await userHandler.update(Number(id), req.body);
          return successResponse(res, {
            message: `Update profile successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.post(
      "/upload/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      uploader.fields([{ name: "avatar" }, { name: "cover" }]),
      async (req, res) => {
        try {
          const { id } = req.params;
          const url = await userHandler.upload(Number(id), req.files);
          return successResponse(res, url);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.get(
      "/followings/:userId",
      authMiddleware.authToken,
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { userId } = req.params;
          const followings = await userHandler.getAllUserFollowing(
            Number(userId)
          );
          return successResponse(res, followings);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.get(
      "/followers/:userId",
      authMiddleware.authToken,
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { userId } = req.params;
          const followings = await userHandler.getAllUserFollowers(
            Number(userId)
          );
          return successResponse(res, followings);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.get(
      "/followed-yet/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      routerHelper.validateQuery(schemas.filterQuery),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { id } = req.params;
          const { page, limit } = req.query;
          const { users, total } = await userHandler.getAllFollowingYet(
            Number(id),
            {
              limit: Number(limit),
              page: Number(page),
            }
          );
          const totalPage = Math.ceil(total / Number(limit));
          return successResponse(res, { users, page: Number(page), totalPage });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.put(
      "/update-password/:id",
      authMiddleware.authToken,
      routerHelper.validateParams(schemas.params),
      routerHelper.validateBody(schemas.updatePassword),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { id } = req.params;
          await userHandler.updatePassword(req.body, Number(id));
          return successResponse(res, {
            message: "Your password Updated successfully",
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    return router;
  }
}

export default new UserRouter();
