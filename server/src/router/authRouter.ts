import express from "express";
import {
  register,
  login,
  refeshToken,
  forgotPassword,
  resetPassword,
  checkTokenVefifyAccount,
  logout,
  googleCallBack,
  profileUser,
} from "../controller/authController";
import { verifyToken } from "../middleware/authMiddleware";
import passport from "passport";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/refesh", refeshToken);
router.post("/reset-password/:userId/:token", resetPassword);
router.post("/verify-email/:id/:token", checkTokenVefifyAccount);
router.post("/logout", verifyToken, logout);
router.get("/profile-user", profileUser);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  googleCallBack
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);
export default router;
