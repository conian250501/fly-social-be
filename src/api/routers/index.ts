import { Router } from "express";
import IRouter from "./interface/IRouter";
import authRouter from "./auth.router";
import tweetRouter from "./tweetRouter";
import commentRouter from "./comment.router";
import likeRouter from "./like.router";

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    router.use("/auth", authRouter.routes);
    router.use("/tweets", tweetRouter.routes);
    router.use("/comments", commentRouter.routes);
    router.use("/likes", likeRouter.routes);
    return router;
  }
}

export default new BaseRouter();
