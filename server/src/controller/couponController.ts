import { NextFunction, Request, Response } from "express";
import couponService from "../service/couponService";
import { couponSuc } from "../utils/responseMessage";

export const createConpon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const newCoupon = await couponService.createCoupon(data);
    res
      .status(200)
      .json({ status: 200, data: newCoupon, message: couponSuc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
export const getAllCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupons = await couponService.getAllCoupon();
    res
      .status(200)
      .json({ status: 200, data: coupons, message: couponSuc.SUC_2 });
  } catch (err) {
    next(err);
  }
};
export const getCouponById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const coupon = await couponService.getCouponById(id);
    res
      .status(200)
      .json({ status: 200, data: coupon, message: couponSuc.SUC_3 });
  } catch (err) {
    next(err);
  }
};
export const updateCouponById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updateCoupon = await couponService.updateCouponId(id, data);
    res
      .status(200)
      .json({ status: 200, data: updateCoupon, message: couponSuc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export const deleteCouponById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deleteCoupon = await couponService.deleteCouponById(id);
    res
      .status(200)
      .json({ status: 200, data: deleteCoupon, message: couponSuc.SUC_5 });
  } catch (err) {
    next(err);
  }
};
