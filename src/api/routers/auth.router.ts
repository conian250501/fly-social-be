import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { TypeAuth } from "../../database/entities/User";
import userHandler from "../handlers/user.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import "../middlewares/passport.middleware";
import { IUserAuthInfoRequest } from "../types/interface";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import authHandler from "../handlers/auth.handler";

const router = Router();
class AuthRouter implements IRouter {
  get routes() {

    router.post("/google", passport.authenticate("google-oauth-token", { session: false }),
      async (req, res) => {
        try {

          return successResponse(res, req.user);

        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post("/facebook", passport.authenticate("facebook-token", { session: false }),
      async (req, res) => {
        try {
          return successResponse(res, req.user);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post("/github", passport.authenticate("github-token", { session: false }),
      async (req, res) => {
        try {

          return successResponse(res, req.user);

        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.get("/github/access-token", async (req, res) => {
      try {
        const {code} = req.query
        const result = await authHandler.getTokenGithub(String(code));
        
        if(result.error){
          throw new Error(result.error_description)
        }
        return successResponse(res, result.access_token);

      } catch (error) {
        return errorResponse(res, error);
      }
    });

    router.post(
      "/sign-up",
      routerHelper.validateBody(schemas.authRegister),
      async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body

          const userExist = await userHandler.getAccountLocal(TypeAuth.LOCAL, email);

          if (userExist) {
            throw new Error(`User has email ${email} exist`)
          }

          const passwordHashed = await bcrypt.hash(password, 10);
          const newUser = await userHandler.create({
            ...req.body,
            password: passwordHashed,
            typeAuth: TypeAuth.LOCAL
          });

          return successResponse(res, newUser);

        } catch (error) {
          return errorResponse(res, error);
        }
      });

    router.post(
      "/sign-in",
      routerHelper.validateBody(schemas.authLogin),
      async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body

          const user = await userHandler.getAccountLocal(TypeAuth.LOCAL, email);

          if (!user) {
            throw new Error("User dont exist");
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            throw new Error("Passowrd incorrect");
          }
          const newToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          return successResponse(res, { ...user, token: newToken });
        } catch (error) {
          return errorResponse(res, error);
        }
      });

    router.get("/get-user", authMiddleware.authToken, async (req: IUserAuthInfoRequest, res: Response) => {
      try {
        return successResponse(res, req.user)
      } catch (error) {
        return errorResponse(res, error);
      }
    })
    return router;
  }
}

export default new AuthRouter();