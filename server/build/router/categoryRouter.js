"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const router = express_1.default.Router();
router.post("/create", categoryController_1.createCategory);
router.put("/updateById/:id", categoryController_1.updateCategoryById);
router.get("/getAll", categoryController_1.getAllCategory);
router.delete("/deleteById/:id", categoryController_1.deleteCategoryById);
exports.default = router;
