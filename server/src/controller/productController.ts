import { NextFunction, Request, Response } from "express";
import productService from "../service/productService";
import { productSuc } from "../utils/responseMessage";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.createProduct(req.body);
    res
      .status(200)
      .json({ status: 200, data: product, message: productSuc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getAllProduct();
    res
      .status(200)
      .json({ status: 200, data: products, message: productSuc.SUC_2 });
  } catch (err) {
    next(err);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    res
      .status(200)
      .json({ status: 200, data: product, message: productSuc.SUC_3 });
  } catch (err) {
    next(err);
  }
};
export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await productService.deleteProductById(id);
    res.status(200).json({ status: 200, data: [], message: productSuc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updateProduct = await productService.updateProductById(id, data);
    res
      .status(200)
      .json({ status: 200, data: updateProduct, message: productSuc.SUC_5 });
  } catch (err) {
    next(err);
  }
};
