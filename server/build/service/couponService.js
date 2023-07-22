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
const couponModel_1 = __importDefault(require("../models/couponModel"));
const createError_1 = __importDefault(require("../utils/createError"));
const responseMessage_1 = require("../utils/responseMessage");
const validateId_1 = __importDefault(require("../validation/validateId"));
const createCoupon = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCoupon = yield couponModel_1.default.create(data);
    return newCoupon;
});
const getAllCoupon = () => __awaiter(void 0, void 0, void 0, function* () {
    const coupons = yield couponModel_1.default.find();
    return coupons;
});
const getCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(id);
    const coupon = yield couponModel_1.default.findById(id);
    if (coupon) {
        throw (0, createError_1.default)(400, responseMessage_1.couponErr.ERR_2);
    }
    return coupon;
});
const updateCouponId = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(id);
    const updateCoupon = yield couponModel_1.default.findByIdAndUpdate(id, { data });
    if (updateCoupon) {
        throw (0, createError_1.default)(400, responseMessage_1.couponErr.ERR_4);
    }
    return updateCoupon;
});
const deleteCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateId_1.default)(id);
    const deleteCouponById = yield couponModel_1.default.findByIdAndDelete(id);
    if (!deleteCouponById) {
        throw (0, createError_1.default)(400, responseMessage_1.couponErr.ERR_5);
    }
    return deleteCouponById;
});
const couponService = {
    createCoupon,
    updateCouponId,
    deleteCouponById,
    getAllCoupon,
    getCouponById,
};
exports.default = couponService;
