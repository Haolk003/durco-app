import { Request, Response, NextFunction } from "express";

import cartService from "../service/cartService";
import { cartSuc } from "../utils/responseMessage";
import { createCipheriv } from "crypto";

export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const data = req.body;
  try {
    const newCart = await cartService.createCart(data, _id);
    res
      .status(200)
      .json({ status: 200, data: newCart, message: cartSuc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  try {
    const carts = await cartService.getCart(_id);
    res.status(200).json({ status: 200, data: carts, message: cartSuc.SUC_3 });
  } catch (err) {
    next(err);
  }
};
export const changeUpdateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, count } = req.body;
  const { _id } = req.user;
  try {
    const updateCart = await cartService.updateCart(count, productId, _id);
    res
      .status(200)
      .json({ status: 200, data: updateCart, message: cartSuc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export const emptyCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  try {
    const emptyCart = await cartService.emptyCart(_id);
    res
      .status(200)
      .json({ status: 200, data: emptyCart, message: cartSuc.SUC_5 });
  } catch (err) {
    next(err);
  }
};
export const applyCouponCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const { couponCode } = req.body;
  try {
    const cart = await cartService.applyCoupon(_id, couponCode);
    res.status(200).json({ status: 200, data: cart, message: cartSuc.SUC_6 });
  } catch (err) {
    next(err);
  }
};
