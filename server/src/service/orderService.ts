import Stripe from "stripe";
import { v4 as uuid4 } from "uuid";
import orderModel from "../models/orderModel";
import cartModel from "../models/cartModel";
import productModel from "../models/productModel";
import validateMongoId from "../validation/validateId";
import createError from "../utils/createError";
import { orderErr } from "../utils/responseMessage";

interface createOrderData {
  tripeId: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
}
const stripe = new Stripe(`${process.env.SECRET_KEY_STRIPE}`, {
  apiVersion: "2022-11-15",
});
const createOrder = async (
  data: createOrderData,
  userId: string,
  stripeId: string,
  couponApplied: string
) => {
  validateMongoId(userId);
  const userCart = await cartModel.findOne({ createdBy: userId });
  if (!userCart || userCart.products.length == 0) {
    throw createError(401, orderErr.ERR_1);
  }
  if (data.paymentMethod === "card") {
    const payment = await stripe.paymentIntents.create({
      amount: userCart.totalAfterDicount,
      currency: "USD",
      payment_method: stripeId,
      confirm: true,
    });
    const newOrder = await orderModel.create({
      products: userCart.products,
      paymentIntent: {
        id: uuid4(),
        currency: payment.currency,
        created: new Date(),
        paymentMethod: payment.payment_method,
        status: payment.status,
        amount: payment.amount,
      },
      amount: userCart.totalAfterDicount,
      orderBy: userId,
      address: data.address,
      phone: data.phoneNumber,
      type: "card",
    });
    await Promise.all(
      userCart.products.map(async (product, index) => {
        await productModel.findByIdAndUpdate(product, {
          $inc: { sold: userCart.cartTotal },
        });
      })
    );

    await cartModel.findByIdAndUpdate(
      userCart._id,
      { $set: { products: [] } },
      { new: true }
    );

    return newOrder;
  }
};

const orderService = {
  createOrder,
};
export default orderService;
