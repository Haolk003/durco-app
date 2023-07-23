"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
router.post("/forgot", authController_1.forgotPassword);
router.post("/refesh", authController_1.refeshToken);
router.post("/reset-password/:userId/:token", authController_1.resetPassword);
router.post("/verify-email/:id/:token", authController_1.checkTokenVefifyAccount);
router.post("/logout", authMiddleware_1.verifyToken, authController_1.logout);
router.get("/profile-user", authMiddleware_1.verifyToken, authController_1.profileUser);
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
}), authController_1.googleCallBack);
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
}));
exports.default = router;
