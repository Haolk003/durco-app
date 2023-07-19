import express from "express";
import {
  createCategory,
  getAllCategory,
  deleteCategoryById,
  updateCategoryById,
} from "../controller/categoryController";
const router = express.Router();
router.post("/create", createCategory);
router.put("/updateById/:id", updateCategoryById);
router.get("/getAll", getAllCategory);
router.delete("/deleteById/:id", deleteCategoryById);
export default router;
