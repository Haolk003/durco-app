import express from "express";
import {
  createBrand,
  deleteBrandById,
  getAllBrand,
  updateBrandById,
} from "../controller/brandController";
const router = express.Router();
router.post("/create", createBrand);
router.put("/updateById/:id", updateBrandById);
router.get("/getAllBrand", getAllBrand);
router.delete("/deletebyId/:id", deleteBrandById);

export default router;
