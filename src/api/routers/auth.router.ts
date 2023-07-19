import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { TypeAuth, User } from "../../database/entities/User";
import userHandler from "../handlers/user.handler";
import { routerHelper, schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import "../middlewares/passport.middleware";
import { IUserAuthInfoRequest } from "../types/interface";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import authHandler from "../handlers/auth.handler";
import mailer from "../services/mailer";
import { EUserStatus } from "../../database/entities/interfaces/user.interface";

const router = Router();
class AuthRouter implements IRouter {
  get routes() {
    router.post(
      "/google",
      passport.authenticate("google-oauth-token", { session: false }),
      async (req, res) => {
        try {
          return successResponse(res, req.user);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post(
      "/facebook",
      passport.authenticate("facebook-token", { session: false }),
      async (req, res) => {
        try {
          return successResponse(res, req.user);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post(
      "/github",
      passport.authenticate("github-token", { session: false }),
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
        const { code } = req.query;
        const result = await authHandler.getTokenGithub(String(code));

        if (result.error) {
          throw new Error(result.error_description);
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
          const { email, password } = req.body;

          const userExist = await userHandler.getAccountLocal(
            TypeAuth.LOCAL,
            email
          );

          if (userExist) {
            throw new Error(`User has email ${email} exist`);
          }

          const passwordHashed = await bcrypt.hash(password, 10);
          const newUser = await userHandler.create({
            ...req.body,
            password: passwordHashed,
            typeAuth: TypeAuth.LOCAL,
          });

          return successResponse(res, newUser);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post(
      "/sign-in",
      routerHelper.validateBody(schemas.authLogin),
      async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;

          const user = await userHandler.getAccountLocal(TypeAuth.LOCAL, email);

          if (!user) {
            throw new Error("User dont exist");
          }

          if (user.status === EUserStatus.InActive) {
            throw new Error(
              `You are blocked for this app! send mail to check the reason`
            );
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            throw new Error("Passowrd incorrect");
          }
          const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          return successResponse(res, { ...user, token: newToken });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.get(
      "/get-user",
      authMiddleware.authToken,
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          return successResponse(res, req.user);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post(
      "/forgot-password",
      routerHelper.validateBody(schemas.forgotPassword),
      async (req: Request, res: Response) => {
        try {
          const { email } = req.body;
          const user = await userHandler.getAccountLocal(TypeAuth.LOCAL, email);
          if (!user) {
            throw new Error(`User doesn't exist`);
          }
          const token: any = jwt.sign(
            {
              id: user.id,
              email: email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          const subject = "Confirm your account here";
          const html = `
              <p>Please go to link below to reset your password account</p>
              <a href="${process.env.CLIENT_URL}/auth/reset-password?token=${token}">Reset your password NOW</a>
            `;

          await mailer.sendMailAuth(email, subject, html);

          return successResponse(res, { message: "Send mail successfully" });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post(
      "/reset-password",
      authMiddleware.authToken,
      routerHelper.validateBody(schemas.resetPassword),
      async (req: IUserAuthInfoRequest, res: Response) => {
        try {
          const { newPassword } = req.body;
          const user = await userHandler.getAccountLocalById(req.user.id);

          const isValidPassword = await bcrypt.compare(
            newPassword,
            user.password
          );
          if (isValidPassword) {
            throw new Error("You have used this password before");
          }

          const passwordHashed = await bcrypt.hash(newPassword, 10);
          const result = await userHandler.update(user.id, {
            password: passwordHashed,
          } as User);

          if (!result.affected) {
            throw new Error("Update password failed");
          }
          return successResponse(res, {
            message: `Updated password for account ${user.email} successfully`,
          });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post(
      "/verify-token",
      routerHelper.validateBody(schemas.verifyToken),
      async (req: Request, res: Response) => {
        try {
          const { token } = req.body;
          const result: JwtPayload | any = jwt.verify(
            token,
            process.env.JWT_SECRET
          );

          if (Date.now() >= result.exp * 1000) {
            return errorResponse(res, new Error("Token expired"), 403);
          }
          const user = await userHandler.getById(result.id);

          return successResponse(res, { user });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new AuthRouter();
