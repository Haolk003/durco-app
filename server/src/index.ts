import express, { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import cors from "cors";
import database from "./config/database";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import errMiddleware from "./middleware/errMiddleware";
import authRouter from "./router/authRouter";
import productRouter from "./router/productRouter";
import categoryRouter from "./router/categoryRouter";
import brandRouter from "./router/brandRouter";
import userRouter from "./router/userRouter";
import couponRouter from "./router/couponRouter";
import cartRouter from "./router/cartRouter";
import colorRouter from "./router/colorRouter";
import "./config/passport";
const app = express();
dotenv.config();
app.use(cors({ credentials: true, origin: [`${process.env.FRONTEND_HOST}`] }));
app.use(cookieParser());
app.use(express.json());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/user", userRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/cart", cartRouter);
app.use("/api/color", colorRouter);
//TODO: catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});
// error handler

app.use(errMiddleware);

app.listen(process.env.PORT || 5000, () => {
  database();
  console.log(`Server in running on port ${process.env.PORT || 5000}`);
});
