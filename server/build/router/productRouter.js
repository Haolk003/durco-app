"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
router.post("/create", productController_1.createProduct);
router.put("/update/:id", productController_1.updateProductById);
router.get("/getById/:id", productController_1.getProductById);
router.get("/getAll", productController_1.getAllProduct);
router.delete("/deleteById/:id", productController_1.deleteProductById);
exports.default = router;
