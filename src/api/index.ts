import cors from "cors";
import express, { Application, Request, Response } from "express";
import "./middlewares/passport.middleware";
import BaseRouter from "./routers";

interface IApi {
  server(): Promise<Application>
}

class Api implements IApi{
  async server(): Promise<Application> {
      const app = express();
      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use("/api/v1", BaseRouter.routes);
  
      app.get("/", (_req: Request, res: Response) => {
        res.send("Welcome to NUS express application!");
      });
      return app;
  }
}

export default new Api();