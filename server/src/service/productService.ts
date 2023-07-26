import productModel from "../models/productModel";
import { isEmpty } from "lodash";
import validateMongoId from "../validation/validateId";
import { productErr } from "../utils/responseMessage";
import createError from "../utils/createError";
import filterAndReplaceObject from "../utils/filterAndReplaceObject";

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
interface IQuery {
  keyword?: string;
  sort?: string;
  price?: string;
  category?: string;
  color?: string;
  brand?: string;
  page?: number;
  limit?: number;
}
const getFilterProduct = async (query: IQuery) => {
  const cleanedObject = filterAndReplaceObject(query);

  const queryObj = !isEmpty(query.keyword)
    ? Object.assign(
        { title: { $regex: query.keyword, $options: "i" } },
        cleanedObject
      )
    : cleanedObject;
  const limit = query.limit || 10;
  const skip = query.page ? (query.page - 1) * limit : 0;
  let filterProduct = productModel.find(queryObj);
  if (query.sort) {
    const sortBy = query.sort.split(",").join(" ");
    filterProduct = filterProduct.sort(sortBy);
  } else {
    filterProduct = filterProduct.sort("-createdAt");
  }
  const countryQuery = filterProduct.model.countDocuments(
    filterProduct.getFilter()
  );
  const totalCount = await countryQuery.exec();
  filterProduct = filterProduct.skip(skip).limit(limit);
  const products = await filterProduct;
  return { products, totalCount };
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
  getFilterProduct,
};

export default productService;
