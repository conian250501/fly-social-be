import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponse } from "../routers/response";

export const schemas = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  filterQuery: Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
  }),
  authRegister: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    passwordConfirm: Joi.valid(Joi.ref("password")).required(),
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
    token: Joi.string().required(),
  }),
  verifyToken: Joi.object({
    token: Joi.string().required(),
  }),

  createTweetBody: Joi.object({
    file: Joi.string().allow(null, {}, ""),
    content: Joi.string().max(255).required(),
    isPrivate: Joi.boolean().required(),
  }),
  updateTweetParams: Joi.object({
    id: Joi.number().required(),
  }),
  updateTweetBody: Joi.object({
    file: Joi.string().allow(null, {}, ""),
    content: Joi.string().max(255).required(),
    isPrivate: Joi.boolean().required(),
  }),
  likeBody: Joi.object({
    tweetId: Joi.number().required(),
  }),
  disLikeBody: Joi.object({
    tweetId: Joi.number().required(),
  }),
  newCommentBody: Joi.object({
    content: Joi.string().max(255).required().allow(""),
  }),
  updateCommentBody: Joi.object({
    content: Joi.string().max(255).allow(""),
  }),
  saveTweetBody: Joi.object({
    tweetId: Joi.number().required(),
  }),
  unSaveTweetParams: Joi.object({
    tweetId: Joi.number().required(),
  }),
  getAllTweetsByUserParams: Joi.object({
    userId: Joi.number().required(),
  }),
};

export const routerHelper = {
  validateBody: (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return errorResponse(res, result.error);
      } else {
        next();
      }
    };
  },

  validateQuery: (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.query);
      if (result.error) {
        return errorResponse(res, result.error);
      } else {
        next();
      }
    };
  },

  validateParams: (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.params);
      if (result.error) {
        return errorResponse(res, result.error);
      } else {
        next();
      }
    };
  },
};
