import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponse } from "../routers/response";
import { EGender } from "../../database/entities/interfaces/user.interface";
import { ETweetStatus } from "../../database/entities/interfaces/tweet.interface";

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
    content: Joi.string().max(255).required().allow(""),
    isPrivate: Joi.boolean().required(),
  }),
  updateTweetParams: Joi.object({
    id: Joi.number().required(),
  }),
  updateTweetBody: Joi.object({
    image: Joi.string().allow(null, {}, ""),
    content: Joi.string().max(255),
    isPrivate: Joi.boolean(),
    status: Joi.string().valid(
      ETweetStatus.Archived,
      ETweetStatus.New,
      ETweetStatus.Pinned
    ),
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
  getAllTweetsByUserQuery: Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
    status: Joi.string().valid(
      ETweetStatus.Archived,
      ETweetStatus.New,
      ETweetStatus.Pinned
    ),
    isArchived: Joi.string().allow(""),
  }),
  updateProfileBody: Joi.object({
    name: Joi.string().allow(""),
    nickname: Joi.string().allow(""),
    bio: Joi.string().allow(""),
    address: Joi.string().allow(""),
    website: Joi.string().allow(""),
    birthDate: Joi.string().allow(""),
    cover: Joi.string().allow({}, ""),
    avatar: Joi.string().allow({}, ""),
    phone: Joi.string().allow(""),
    gender: Joi.string().valid(EGender.Female, EGender.Male, EGender.Other),
  }),
  followUserBody: Joi.object({
    userFollowedId: Joi.number().required(),
  }),
  unFollowUserBody: Joi.object({
    userFollowedId: Joi.number().required(),
  }),
  updatePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  }),
  getUsersQuery: Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
    name: Joi.string().allow(""),
  }),

  newConversation: Joi.object({
    participantIds: Joi.array().items(Joi.number()).required(),
  }),
  newMessage: Joi.object({
    content: Joi.string().required(),
    conversationId: Joi.number().required(),
    file: Joi.string().allow("", null, {}),
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
