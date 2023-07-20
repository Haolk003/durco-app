import express from "express";
import {
  createConpon,
  deleteCouponById,
  getAllCoupon,
  getCouponById,
  updateCouponById,
} from "../controller/couponController";

const router = express.Router();
router.post("/create", createConpon);
router.get("/getAll", getAllCoupon);
router.get("/getById/:id", getCouponById);
router.put("/updateById/:id", updateCouponById);
router.delete("/deleteById/:id", deleteCouponById);
export default router;
