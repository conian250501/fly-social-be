import { Router } from "express";
import IRouter from "./interface/IRouter";
import authRouter from "./auth.router";
import tweetRouter from "./tweet.router";
import commentRouter from "./comment.router";
import likeRouter from "./like.router";
import StorageTweetRouter from "./StorageTweet.router";
import userRouter from "./user.router";
import followRouter from "./follow.router";
import adminUserRouter from "./admin/user.router";
import adminTweetRouter from "./admin/tweet.router";
import conversationRouter from "./conversationRouter";
import messageRouter from "./messageRouter";

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
    router.use("/conversations", conversationRouter.routes);
    router.use("/messages", messageRouter.routes);

    // ADMIN
    router.use("/admin/users", adminUserRouter.routes);
    router.use("/admin/tweets", adminTweetRouter.routes);
    return router;
  }
}

export default new BaseRouter();
