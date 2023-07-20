import cartModel from "../models/cartModel";
import couponModel from "../models/couponModel";
import createError from "../utils/createError";
import { cartErr, couponErr } from "../utils/responseMessage";
import validateMongoId from "../validation/validateId";

interface createCartProps {
  productId: string;
  count: number;
  color: string;
}
const createCart = async (data: createCartProps, userId: string) => {
  validateMongoId(userId);
  const findCart = await cartModel.findOne({ createdBy: userId });
  if (!findCart) {
    throw createError(401, cartErr.ERR_6);
  }
  const newCart = await cartModel.findByIdAndUpdate(findCart._id, {
    $push: {
      products: {
        product: data.productId,
        count: data.count,
        color: data.color,
      },
      cartTotal: findCart.cartTotal + data.count,
    },
  });
  return newCart;
};
const updateCart = async (count: number, productId: string, userId: string) => {
  validateMongoId(userId);
  const findCart = await cartModel.findOne({ createdBy: userId });
  if (!findCart) {
    throw createError(401, cartErr.ERR_6);
  }
  if (count > 0) {
    const cartUpdate = await cartModel.findOneAndUpdate(
      { createdBy: userId, "products.product": productId },
      {
        $set: {
          "products.$.count": count,
          cartTotal: findCart.cartTotal + count,
        },
      },
      { new: true }
    );
    return cartUpdate;
  } else {
    const cartUpdate = await cartModel.findOneAndUpdate(
      { createdBy: userId },
      {
        $pull: { products: { product: productId } },
        $set: { cartTotal: findCart.cartTotal - count },
      },
      { new: true }
    );
    return cartUpdate;
  }
};
const emptyCart = async (userId: string) => {
  validateMongoId(userId);
  const cart = await cartModel.findOneAndUpdate(
    { createdBy: userId },
    { $set: { products: [], cartTotal: 0 } },
    { new: true }
  );
  if (!cart) {
    throw createError(401, cartErr.ERR_6);
  }
  return cart;
};
const getCart = async (userId: string) => {
  validateMongoId(userId);
  const cart = await cartModel
    .findOne({ createdBy: userId })
    .populate("createdBy products.product");
  if (!cart) {
    throw createError(401, cartErr.ERR_6);
  }
  return cart;
};
const applyCoupon = async (userId: string, couponCode: string) => {
  validateMongoId(userId);
  const findCoupon = await couponModel.findOne({ code: couponCode });
  if (!findCoupon) {
    throw createError(401, couponErr.ERR_6);
  }
  const findCart = await cartModel.findOne({ createdBy: userId });
  if (!findCart) {
    throw createError(410, cartErr.ERR_6);
  } else if (findCart.products.length <= 0) {
    return;
  } else {
    const totalDiscount = (
      findCart.cartTotal -
      (findCart.cartTotal * findCoupon.discount) / 100
    ).toFixed(2);
    const updateCart = await cartModel
      .findByIdAndUpdate(
        findCart._id,
        { $set: { totalAfterDicount: totalDiscount } },
        { new: true }
      )
      .populate("createdBy products.product");
    return updateCart;
  }
};
const cartService = {
  createCart,
  getCart,
  applyCoupon,
  emptyCart,
  updateCart,
};
export default cartService;
