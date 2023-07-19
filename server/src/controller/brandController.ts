import { Request, Response, NextFunction } from "express";
import brandService from "../service/brandService";
import { brandSuc } from "../utils/responseMessage";

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { name, logo } = req.body;
  try {
    const Brand = await brandService.createBrand({ name, logo });
    res.status(200).json({ status: 200, data: Brand, message: brandSuc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
const getAllBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await brandService.getAllBrand();
    res
      .status(200)
      .json({ status: 200, data: categories, message: brandSuc.SUC_2 });
  } catch (err) {
    next(err);
  }
};
const updateBrandById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const Brand = await brandService.updateBrandById(id, data);
    res.status(200).json({ status: 200, data: Brand, message: brandSuc.SUC_3 });
  } catch (err) {
    next(err);
  }
};
const deleteBrandById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await brandService.deleteBrandById(id);
    res.status(200).json({ status: 200, data: [], message: brandSuc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export { deleteBrandById, getAllBrand, updateBrandById, createBrand };
