import express from "express";
import {
  register,
  login,
  refeshToken,
  forgotPassword,
  resetPassword,
  checkTokenVefifyAccount,
} from "../controller/authController";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/refesh", refeshToken);
router.post("/reset-password/:userId/:token", resetPassword);
router.post("/verify-email/:id/:token", checkTokenVefifyAccount);
export default router;
