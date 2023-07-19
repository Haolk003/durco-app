import { NextFunction, Request, Response } from "express";

import { isEmpty } from "lodash";
import jwt, { VerifyErrors, JwtPayload, VerifyOptions } from "jsonwebtoken";
import userModel from "../models/userModel";
import createError from "../utils/createError";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      _id: string;
      role: string;
    };
  }
}
interface userToken {
  _id: string;
  role: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  const options: VerifyOptions = {
    algorithms: ["HS256"], // Specify the expected algorithm used for signing the token
  };

  try {
    if (isEmpty(token)) {
      throw createError(401, "Not author token expried,Please login again");
    }
    jwt.verify(
      token,
      `${process.env.JWT_KEY}`,
      options,
      async (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          throw createError(401, "Failed to retrieve user information");
        }
        const user = decoded as userToken;
        const findUser = await userModel.findOne({
          _id: user._id,
          role: user.role,
        });
        if (!findUser) {
          throw createError(401, "Failed to retrieve user information");
        }
        req.user = user;
        next();
      }
    );
  } catch (err) {
    next(err);
  }
};
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verifyToken(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (req.params.id !== req.user._id) {
        throw createError(401, "Not authoried!");
      } else {
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};
export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verifyToken(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (req.user.role !== "admin") {
        throw createError(401, "You are not admin");
      } else {
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};
