import { Router } from "express";
import IRouter from "./interface/IRouter";
import authMiddleware from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "./response";
import { routerHelper, schemas } from "../helpers/router.helper";
import userHandler from "../handlers/user.handler";
import multer from "multer";

const router = Router();
const uploader = multer({
  storage: multer.diskStorage({}),
});

class UserRouter implements IRouter {
  get routes() {
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
    return router;
  }
}

export default new UserRouter();
