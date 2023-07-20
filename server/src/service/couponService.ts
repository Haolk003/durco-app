import couponModel from "../models/couponModel";
import createError from "../utils/createError";
import { couponSuc, couponErr } from "../utils/responseMessage";
import validateMongoId from "../validation/validateId";

interface createCouponProps {
  name: string;
  code: string;
  startDate?: Date;
  endDate?: Date;
  discount: number;
}
interface updateCouponProps {
  name?: string;
  code?: string;
  startDate?: Date;
  endDate?: Date;
  discount?: number;
}
const createCoupon = async (data: createCouponProps) => {
  const newCoupon = await couponModel.create(data);
  return newCoupon;
};
const getAllCoupon = async () => {
  const coupons = await couponModel.find();
  return coupons;
};
const getCouponById = async (id: string) => {
  validateMongoId(id);
  const coupon = await couponModel.findById(id);
  if (coupon) {
    throw createError(400, couponErr.ERR_2);
  }
  return coupon;
};
const updateCouponId = async (id: string, data: updateCouponProps) => {
  validateMongoId(id);
  const updateCoupon = await couponModel.findByIdAndUpdate(id, { data });
  if (updateCoupon) {
    throw createError(400, couponErr.ERR_4);
  }
  return updateCoupon;
};
const deleteCouponById = async (id: string) => {
  validateMongoId(id);
  const deleteCouponById = await couponModel.findByIdAndDelete(id);
  if (!deleteCouponById) {
    throw createError(400, couponErr.ERR_5);
  }
  return deleteCouponById;
};

const couponService = {
  createCoupon,
  updateCouponId,
  deleteCouponById,
  getAllCoupon,
  getCouponById,
};
export default couponService;
