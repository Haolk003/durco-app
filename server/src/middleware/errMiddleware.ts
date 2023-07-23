import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
const errMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const errStatus = err.status || 500;
  const errMessage = err.message || "something went wrong";
  return res.status(errStatus).json({
    success: false,
    message: errMessage,
    status: errStatus,
    stack: err.stack,
  });
};
export default errMiddleware;
