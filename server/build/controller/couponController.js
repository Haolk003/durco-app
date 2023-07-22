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
exports.deleteCouponById = exports.updateCouponById = exports.getCouponById = exports.getAllCoupon = exports.createConpon = void 0;
const couponService_1 = __importDefault(require("../service/couponService"));
const responseMessage_1 = require("../utils/responseMessage");
const createConpon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newCoupon = yield couponService_1.default.createCoupon(data);
        res
            .status(200)
            .json({ status: 200, data: newCoupon, message: responseMessage_1.couponSuc.SUC_1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createConpon = createConpon;
const getAllCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield couponService_1.default.getAllCoupon();
        res
            .status(200)
            .json({ status: 200, data: coupons, message: responseMessage_1.couponSuc.SUC_2 });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCoupon = getAllCoupon;
const getCouponById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const coupon = yield couponService_1.default.getCouponById(id);
        res
            .status(200)
            .json({ status: 200, data: coupon, message: responseMessage_1.couponSuc.SUC_3 });
    }
    catch (err) {
        next(err);
    }
});
exports.getCouponById = getCouponById;
const updateCouponById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const updateCoupon = yield couponService_1.default.updateCouponId(id, data);
        res
            .status(200)
            .json({ status: 200, data: updateCoupon, message: responseMessage_1.couponSuc.SUC_4 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCouponById = updateCouponById;
const deleteCouponById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteCoupon = yield couponService_1.default.deleteCouponById(id);
        res
            .status(200)
            .json({ status: 200, data: deleteCoupon, message: responseMessage_1.couponSuc.SUC_5 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCouponById = deleteCouponById;
