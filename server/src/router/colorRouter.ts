import express from "express";
import {
  createColor,
  deleteColor,
  getAllColor,
  updateColor,
} from "../controller/colorController";
import { checkAdmin, verifyToken } from "../middleware/authMiddleware";
const router = express.Router();
router.post("/create", checkAdmin, createColor);
router.put("/updateById/:id", checkAdmin, updateColor);
router.get("/getAll", getAllColor);
router.delete("/deleteById", checkAdmin, deleteColor);
export default router;
