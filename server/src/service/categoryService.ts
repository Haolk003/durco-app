import categoryModel from "../models/categoryModel";
import createError from "../utils/createError";
import { categorySuc, categoryErr } from "../utils/responseMessage";
import validateMongoId from "../validation/validateId";
const createCategory = async (name: string, image: string) => {
  const newCategory = await categoryModel.create({ name, image });
  return newCategory;
};
const getAllCategory = async () => {
  const categories = await categoryModel.find();
  return categories;
};
interface updateCategoryData {
  name: string;
  image: string;
}
const updateCategoryById = async (id: string, data: updateCategoryData) => {
  await validateMongoId(id);
  const findCategory = await categoryModel.findById(id);
  if (!findCategory) {
    throw createError(500, categoryErr.ERR_2);
  }

  const updateCategory = await categoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updateCategory;
};
const deleteCategoryById = async (id: string) => {
  await validateMongoId(id);
  const findCategory = await categoryModel.findById(id);
  if (!findCategory) {
    throw createError(400, categorySuc.SUC_4);
  }
  await categoryModel.findByIdAndDelete(id);
  return;
};
const categoryService = {
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getAllCategory,
};
export default categoryService;
