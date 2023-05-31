import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponse } from "../routers/response";

export const schemas = {
  authRegister: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
    passwordConfirm: Joi.valid(Joi.ref("password")).required()
  }),
  authLogin: Joi.object({
    email: Joi.string().required(), 
    password: Joi.string().required(),
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),
  resetPassword: Joi.object({
    newPassword: Joi.string().required(),
    confirmPassword: Joi.ref("newPassword"),
    token: Joi.string().required()
  }),
  verifyToken: Joi.object({
    token: Joi.string().required(),
  }),

};

export const routerHelper = {
  validateBody: (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return errorResponse(res, result.error)
      } else {
        next();
      }
    };
  },
};
