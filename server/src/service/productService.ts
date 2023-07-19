import productModel from "../models/productModel";
import validateMongoId from "../validation/validateId";
import { productErr } from "../utils/responseMessage";
import createError from "../utils/createError";

interface createProductProps {
  banner: string;
  imageList: [string];
  price: number;
  sold?: number;
  quanlity: number;
  discount?: number;
  title: string;
  status?: string;
  color: [string];
  brand: string;
  tags: [string];
  descripiton?: string;
  category: string;
}
interface updateProductProps {
  banner?: string;
  imageList?: [string];
  price?: number;
  sold?: number;
  quanlity?: number;
  discount?: number;
  title?: string;
  status?: string;
  color?: [string];
  brand?: string;
  tags?: [string];
  descripiton?: string;
  category: string;
}
const createProduct = async (data: createProductProps) => {
  const product = await productModel.create(data);
  return product;
};
const updateProductById = async (id: string, data: updateProductProps) => {
  await validateMongoId(id);
  const findProduct = await productModel.findById(id);
  if (!findProduct) {
    throw createError(500, productErr.ERR_1);
  }
  const updateProduct = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updateProduct;
};
const getAllProduct = async () => {
  const products = await productModel.find();
  return products;
};
const getProductById = async (id: string) => {
  await validateMongoId(id);
  const product = await productModel.findById(id);
  if (!product) {
    throw Error(productErr.ERR_1);
  }
  return product;
};
const deleteProductById = async (id: string) => {
  await validateMongoId(id);
  const findProduct = await productModel.findById(id);
  if (!findProduct) {
    throw createError(500, productErr.ERR_1);
  }

  const product = await productModel.findByIdAndDelete(id);
  return;
};
const productService = {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
export default productService;
