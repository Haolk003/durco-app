"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couponController_1 = require("../controller/couponController");
const router = express_1.default.Router();
router.post("/create", couponController_1.createConpon);
router.get("/getAll", couponController_1.getAllCoupon);
router.get("/getById/:id", couponController_1.getCouponById);
router.put("/updateById/:id", couponController_1.updateCouponById);
router.delete("/deleteById/:id", couponController_1.deleteCouponById);
exports.default = router;
