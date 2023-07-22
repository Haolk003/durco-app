"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controller/cartController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/create", authMiddleware_1.verifyUser, cartController_1.createCart);
router.put("/update", authMiddleware_1.verifyUser, cartController_1.changeUpdateCart);
router.put("/apply-coupon", authMiddleware_1.verifyUser, cartController_1.applyCouponCode);
router.get("/get", authMiddleware_1.verifyUser, cartController_1.getCart);
router.put("/empty-cart", authMiddleware_1.verifyUser, cartController_1.emptyCart);
exports.default = router;
