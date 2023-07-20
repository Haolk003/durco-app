import express from "express";
import {
  createCart,
  applyCouponCode,
  changeUpdateCart,
  emptyCart,
  getCart,
} from "../controller/cartController";
import { verifyUser, verifyToken } from "../middleware/authMiddleware";
const router = express.Router();
router.post("/create", verifyUser, createCart);
router.put("/update", verifyUser, changeUpdateCart);
router.put("/apply-coupon", verifyUser, applyCouponCode);
router.get("/get", verifyUser, getCart);
router.put("/empty-cart", verifyUser, emptyCart);

export default router;
