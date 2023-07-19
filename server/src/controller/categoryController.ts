import { NextFunction, Request, Response } from "express";
import categoryService from "../service/categoryService";
import { categorySuc } from "../utils/responseMessage";
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, parentCategory } = req.body;
  try {
    const category = await categoryService.createCategory(name, parentCategory);
    res
      .status(200)
      .json({ status: 200, data: category, message: categorySuc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategory();
    res
      .status(200)
      .json({ status: 200, data: categories, message: categorySuc.SUC_2 });
  } catch (err) {
    next(err);
  }
};
const updateCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const category = await categoryService.updateCategoryById(id, data);
    res
      .status(200)
      .json({ status: 200, data: category, message: categorySuc.SUC_3 });
  } catch (err) {
    next(err);
  }
};
const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await categoryService.deleteCategoryById(id);
    res.status(200).json({ status: 200, data: [], message: categorySuc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export {
  deleteCategoryById,
  getAllCategory,
  updateCategoryById,
  createCategory,
};
