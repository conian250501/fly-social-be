import { Router } from "express";
import IRouter from "./interface/IRouter";

const router = Router();

class BaseRouter implements IRouter{
  get routes() {
    router.get("/", (req,res) => {
      return res.json({message:"hello"})
    })
    return router;
  }
}

export default new BaseRouter()