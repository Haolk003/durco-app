"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartModel_1 = __importDefault(require("../models/cartModel"));
const couponModel_1 = __importDefault(require("../models/couponModel"));
const createError_1 = __importDefault(require("../utils/createError"));
const responseMessage_1 = require("../utils/responseMessage");
const validateId_1 = __importDefault(require("../validation/validateId"));
const createCart = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(userId);
    const findCart = yield cartModel_1.default.findOne({ createdBy: userId });
    if (!findCart) {
        throw (0, createError_1.default)(401, responseMessage_1.cartErr.ERR_6);
    }
    const newCart = yield cartModel_1.default.findByIdAndUpdate(findCart._id, {
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
});
const updateCart = (count, productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(userId);
    const findCart = yield cartModel_1.default.findOne({ createdBy: userId });
    if (!findCart) {
        throw (0, createError_1.default)(401, responseMessage_1.cartErr.ERR_6);
    }
    if (count > 0) {
        const cartUpdate = yield cartModel_1.default.findOneAndUpdate({ createdBy: userId, "products.product": productId }, {
            $set: {
                "products.$.count": count,
                cartTotal: findCart.cartTotal + count,
            },
        }, { new: true });
        return cartUpdate;
    }
    else {
        const cartUpdate = yield cartModel_1.default.findOneAndUpdate({ createdBy: userId }, {
            $pull: { products: { product: productId } },
            $set: { cartTotal: findCart.cartTotal - count },
        }, { new: true });
        return cartUpdate;
    }
});
const emptyCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(userId);
    const cart = yield cartModel_1.default.findOneAndUpdate({ createdBy: userId }, { $set: { products: [], cartTotal: 0 } }, { new: true });
    if (!cart) {
        throw (0, createError_1.default)(401, responseMessage_1.cartErr.ERR_6);
    }
    return cart;
});
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(userId);
    const cart = yield cartModel_1.default
        .findOne({ createdBy: userId })
        .populate("createdBy products.product");
    if (!cart) {
        throw (0, createError_1.default)(401, responseMessage_1.cartErr.ERR_6);
    }
    return cart;
});
const applyCoupon = (userId, couponCode) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(userId);
    const findCoupon = yield couponModel_1.default.findOne({ code: couponCode });
    if (!findCoupon) {
        throw (0, createError_1.default)(401, responseMessage_1.couponErr.ERR_6);
    }
    const findCart = yield cartModel_1.default.findOne({ createdBy: userId });
    if (!findCart) {
        throw (0, createError_1.default)(410, responseMessage_1.cartErr.ERR_6);
    }
    else if (findCart.products.length <= 0) {
        return;
    }
    else {
        const totalDiscount = (findCart.cartTotal -
            (findCart.cartTotal * findCoupon.discount) / 100).toFixed(2);
        const updateCart = yield cartModel_1.default
            .findByIdAndUpdate(findCart._id, { $set: { totalAfterDicount: totalDiscount } }, { new: true })
            .populate("createdBy products.product");
        return updateCart;
    }
});
const cartService = {
    createCart,
    getCart,
    applyCoupon,
    emptyCart,
    updateCart,
};
exports.default = cartService;
