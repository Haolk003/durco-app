import express from "express";
import {
  createUser,
  updateUserById,
  deleteUserById,
  getAllUser,
  getUserById,
} from "../controller/userController";
import {
  verifyToken,
  verifyUser,
  checkAdmin,
} from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", createUser);
router.get("/getAll", verifyToken, getAllUser);
router.get("/getById/:id", verifyToken, getUserById);
router.put("/updateById/:id", updateUserById);
router.delete("/deleteById/:id", deleteUserById);
export default router;
