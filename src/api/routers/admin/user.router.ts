import { Response, Router } from "express";
import IRouter from "../interface/IRouter";
import authMiddleware from "../../../api/middlewares/auth.middleware";
import roleMiddleware from "../../../api/middlewares/role.middleware";
import { routerHelper, schemas } from "../../../api/helpers/router.helper";
import { errorResponse, successResponse } from "../response";
import userHandler from "../../../api/handlers/admin/user.handler";
import { IUserAuthInfoRequest } from "../../../api/types/interface";
import { EUserStatus } from "../../../database/entities/interfaces/user.interface";

const router = Router();
class UserRouter implements IRouter {
  get routes() {
    router.get(
      "/",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { name, limit, page, status, verified } = req.query;
          const { users, total } = await userHandler.getAll({
            name: String(name),
            limit: Number(limit),
            page: Number(page),
            status: status as EUserStatus,
            verified: String(verified),
            adminId: req.user.id,
          });

          const totalPage = Math.ceil(total / Number(limit));
          return successResponse(res, { users, page: Number(page), totalPage });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.delete(
      "/archived/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;

          await userHandler.softDelete(Number(id));
          return successResponse(res, {
            message: `Archived user successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.put(
      "/restore/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;

          await userHandler.restore(Number(id));
          return successResponse(res, {
            message: `Archived user successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.delete(
      "/delete/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;

          await userHandler.softDelete(Number(id));
          return successResponse(res, {
            message: `Archived user successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.put(
      "/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
          const { id } = req.params;

          await userHandler.update(Number(id), req.body);
          return successResponse(res, {
            message: `Archived user successfully`,
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
