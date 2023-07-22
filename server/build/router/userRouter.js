"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/create", userController_1.createUser);
router.get("/getAll", authMiddleware_1.verifyToken, userController_1.getAllUser);
router.get("/getById/:id", authMiddleware_1.verifyToken, userController_1.getUserById);
router.put("/updateById/:id", userController_1.updateUserById);
router.delete("/deleteById/:id", userController_1.deleteUserById);
exports.default = router;
