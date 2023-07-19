import brandModel from "../models/brandModel";
import { brandErr } from "../utils/responseMessage";
import createError from "../utils/createError";
import validateMongoId from "../validation/validateId";
interface createBrandProps {
  name: string;
  logo?: string;
}
interface updateBrandProps {
  name?: string;
  logo?: string;
}
const createBrand = async (data: createBrandProps) => {
  const newBrand = await brandModel.create(data);
  return newBrand;
};
const getAllBrand = async () => {
  const brands = await brandModel.find();
  return brands;
};
const updateBrandById = async (id: string, data: updateBrandProps) => {
  validateMongoId(id);
  const findBrand = await brandModel.findById(id);
  if (!findBrand) {
    throw createError(400, brandErr.ERR_2);
  }
  const brand = await brandModel.findByIdAndUpdate(id, data);
  return brand;
};
const deleteBrandById = async (id: string) => {
  validateMongoId(id);
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    throw createError(400, brandErr.ERR_3);
  }
  return;
};
const brandService = {
  updateBrandById,
  createBrand,
  deleteBrandById,
  getAllBrand,
};
export default brandService;
