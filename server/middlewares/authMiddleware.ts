import { NextFunction, Request, Response } from "express";
import { CustomError } from "server/utils/customError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { CONFIG } from "server/config/config";
import { RequestUserData } from "server/types/express";

export const userAuthMiddleware = (
  req: Request, _: Response, next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new CustomError('Authorization token is missing', StatusCodes.BAD_REQUEST);

  let decoded;

  try {
    decoded = jwt.verify(token, CONFIG.JWT_SECRET) as RequestUserData;
    console.log(decoded);
  } catch (err) {
    throw new CustomError('Unable to verify token, login required', StatusCodes.UNAUTHORIZED);
  }

  if (!decoded.userId || !decoded.username) {
    throw new CustomError('Unable to verify token, login required', StatusCodes.UNAUTHORIZED);
  }

  req.user = decoded;
  console.log(req.user);
  next();
}

export const adminAuthMiddleware = (
  req: Request, res: Response, next: NextFunction
) => {
  userAuthMiddleware(req, res, (err?: any) => {
    if (err) next(err);

    if (!req.user?.isAdmin) {
      next(new CustomError('Admin access required', StatusCodes.FORBIDDEN));
    }

    next();
  })
}
