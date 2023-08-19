import { NextFunction, Response } from "express";
import { errorResponse } from "../routers/response";
import { IUserAuthInfoRequest } from "../types/interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import userHandler from "../handlers/user.handler";

class AuthMiddleware {
  async authToken(
    req: IUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        throw new Error("Unauthorized");
      }
      const token = authHeader.split(" ")[1];

      if (token == null) {
        throw new Error("Unauthorized");
      }

      const result: JwtPayload | any = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      if (new Date().getTime() >= result.exp * 1000) {
        return errorResponse(res, new Error("Token expired"), 401);
      }

      const user = await userHandler.getById(result.id as number);

      if (!user) {
        throw new Error("Unauthorized");
      }

      req.user = user;
      next();
    } catch (error) {
      return errorResponse(res, error, 401);
    }
  }
}

export default new AuthMiddleware();
