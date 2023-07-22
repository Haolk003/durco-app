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
exports.applyCouponCode = exports.emptyCart = exports.changeUpdateCart = exports.getCart = exports.createCart = void 0;
const cartService_1 = __importDefault(require("../service/cartService"));
const responseMessage_1 = require("../utils/responseMessage");
const createCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const data = req.body;
    try {
        const newCart = yield cartService_1.default.createCart(data, _id);
        res
            .status(200)
            .json({ status: 200, data: newCart, message: responseMessage_1.cartSuc.SUC_1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createCart = createCart;
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    try {
        const carts = yield cartService_1.default.getCart(_id);
        res.status(200).json({ status: 200, data: carts, message: responseMessage_1.cartSuc.SUC_3 });
    }
    catch (err) {
        next(err);
    }
});
exports.getCart = getCart;
const changeUpdateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, count } = req.body;
    const { _id } = req.user;
    try {
        const updateCart = yield cartService_1.default.updateCart(count, productId, _id);
        res
            .status(200)
            .json({ status: 200, data: updateCart, message: responseMessage_1.cartSuc.SUC_4 });
    }
    catch (err) {
        next(err);
    }
});
exports.changeUpdateCart = changeUpdateCart;
const emptyCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    try {
        const emptyCart = yield cartService_1.default.emptyCart(_id);
        res
            .status(200)
            .json({ status: 200, data: emptyCart, message: responseMessage_1.cartSuc.SUC_5 });
    }
    catch (err) {
        next(err);
    }
});
exports.emptyCart = emptyCart;
const applyCouponCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { couponCode } = req.body;
    try {
        const cart = yield cartService_1.default.applyCoupon(_id, couponCode);
        res.status(200).json({ status: 200, data: cart, message: responseMessage_1.cartSuc.SUC_6 });
    }
    catch (err) {
        next(err);
    }
});
exports.applyCouponCode = applyCouponCode;
