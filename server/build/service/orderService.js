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
const stripe_1 = __importDefault(require("stripe"));
const uuid_1 = require("uuid");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const validateId_1 = __importDefault(require("../validation/validateId"));
const createError_1 = __importDefault(require("../utils/createError"));
const responseMessage_1 = require("../utils/responseMessage");
const stripe = new stripe_1.default(`${process.env.SECRET_KEY_STRIPE}`, {
    apiVersion: "2022-11-15",
});
const createOrder = (data, userId, stripeId, couponApplied) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(userId);
    const userCart = yield cartModel_1.default.findOne({ createdBy: userId });
    if (!userCart || userCart.products.length == 0) {
        throw (0, createError_1.default)(401, responseMessage_1.orderErr.ERR_1);
    }
    if (data.paymentMethod === "card") {
        const payment = yield stripe.paymentIntents.create({
            amount: userCart.totalAfterDicount,
            currency: "USD",
            payment_method: stripeId,
            confirm: true,
        });
        const newOrder = yield orderModel_1.default.create({
            products: userCart.products,
            paymentIntent: {
                id: (0, uuid_1.v4)(),
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
        yield Promise.all(userCart.products.map((product, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield productModel_1.default.findByIdAndUpdate(product, {
                $inc: { sold: userCart.cartTotal },
            });
        })));
        yield cartModel_1.default.findByIdAndUpdate(userCart._id, { $set: { products: [] } }, { new: true });
        return newOrder;
    }
});
const orderService = {
    createOrder,
};
exports.default = orderService;
