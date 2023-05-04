import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import userHandler from "../handlers/user.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import { IUserAuthInfoRequest } from "../types/interface";
import "../middlewares/passport.middleware";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";

const router = Router();
class AuthRouter implements IRouter {
  get routes() {

    router.post("/google", passport.authenticate("google-oauth-token", {session: false}), (req,res) => {
      try {
        
        return successResponse(res, req.user);
        
      } catch (error) {
        return errorResponse(res,error);
      }
    })

    router.post(
      "/sign-up",
      routerHelper.validateBody(schemas.authRegister),  
      async (req:Request,res:Response) => {
        try {
          const {email, password} = req.body
          
          const userExist = await userHandler.getByEmail(email);

          if(userExist){
            throw new Error(`User has email ${email} exist`)
          }

          const passwordHashed = await bcrypt.hash(password, 10);
          const newUser = await userHandler.create({...req.body, password: passwordHashed});

          return successResponse(res,newUser);

        } catch (error) {
          return errorResponse(res, error);
        }
    });

    router.post(
      "/sign-in", 
      routerHelper.validateBody(schemas.authLogin),   
      async (req:Request,res:Response) => {
        try {
          const {email, password} = req.body

          const user = await userHandler.getByEmail(email);
          
          if(!user) {
            throw new Error("User dont exist");
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if(!isValidPassword) {
            throw new Error("Passowrd dont match");
          }
          const newToken = jwt.sign(
            {id: user.id}, 
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
          );
          
          return successResponse(res,{...user, token: newToken});
        } catch (error) {
          return errorResponse(res, error);
        }
    });

    router.get("/get-user", authMiddleware.authToken, async (req:IUserAuthInfoRequest, res: Response) => {
      try {
        return successResponse(res, req.user)
      } catch (error) {
        return errorResponse(res,error);
      }
    })
    return router;
  }
}

export default new AuthRouter();