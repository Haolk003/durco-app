import Stripe from "stripe";
import orderModel from "../models/orderModel";
import validateMongoId from "../validation/validateId";
import createError from "../utils/createError";
import { orderErr } from "../utils/responseMessage";

interface createOrderData {
  tripeId: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
}
const createOrder = async (
  data: createOrderData,
  userId: string,
  stripeId: string,
  couponApplied: string
) => {
  validateMongoId(userId);
};
