import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById,
} from "../controller/productController";
const router = express.Router();
router.post("/create", createProduct);
router.put("/update/:id", updateProductById);
router.get("/getById/:id", getProductById);
router.get("/getAll", getAllProduct);
router.delete("/deleteById/:id", deleteProductById);
export default router;
