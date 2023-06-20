import { Router } from "express";
import IRouter from "./interface/IRouter";
import authRouter from "./auth.router";
import tweetRouter from "./tweetRouter";
import commentRouter from "./comment.router";
import likeRouter from "./like.router";
import StorageTweetRouter from "./StorageTweetRouter";
import userRouter from "./user.router";
import followRouter from "./followRouter";

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    router.use("/auth", authRouter.routes);
    router.use("/tweets", tweetRouter.routes);
    router.use("/comments", commentRouter.routes);
    router.use("/likes", likeRouter.routes);
    router.use("/storage-tweets", StorageTweetRouter.routes);
    router.use("/users", userRouter.routes);
    router.use("/follows", followRouter.routes);
    return router;
  }
}

export default new BaseRouter();
