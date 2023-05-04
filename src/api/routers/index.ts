import { Router } from "express";
import IRouter from "./interface/IRouter";
import authRouter from "./auth.router";

const router = Router();

class BaseRouter implements IRouter{
  get routes() {
    router.use("/auth", authRouter.routes);
    return router;
  }
}

export default new BaseRouter()