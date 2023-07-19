"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controller/userController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.post("/create", userController_1.createUser);
router.get("/getAll", authMiddleware_1.verifyToken, userController_1.getAllUser);
router.get("/getById/:id", authMiddleware_1.verifyToken, userController_1.getUserById);
router.put("/updateById/:id", userController_1.updateUserById);
router.delete("/deleteById/:id", userController_1.deleteUserById);
exports.default = router;
