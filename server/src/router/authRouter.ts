import express from "express";
import {
  register,
  login,
  refeshToken,
  forgotPassword,
  resetPassword,
} from "../controller/authController";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/refesh", refeshToken);
router.post("/reset-password/:userId/:token", resetPassword);
export default router;
