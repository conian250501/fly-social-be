import { NextFunction, Response } from "express";
import { errorResponse } from "../routers/response";
import { IUserAuthInfoRequest } from "../types/interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import userHandler from "../handlers/user.handler";

class AuthMiddleware {
  async authToken(req:IUserAuthInfoRequest, res:Response, next:NextFunction) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader.split(" ")[1];

      if(token == null) {
        throw new Error("Unauthorized");
      }

      const result: JwtPayload | any = jwt.verify(token, process.env.JWT_SECRET);

      if(Date.now() >= result.exp * 1000){
        return errorResponse(res, new Error("Token expired"), 401)
      }

      const user = await userHandler.getById(result.id as number);
      req.user = user;
      next();
      
    } catch (error) {
      return errorResponse(res, error, 401);
    }
  }
}

export default new AuthMiddleware();