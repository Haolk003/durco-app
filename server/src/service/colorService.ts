import colorModel from "../models/colorModel";
import createError from "../utils/createError";
import { colorErr } from "../utils/responseMessage";
import validateMongoId from "../validation/validateId";

const createColor = async (name: string, code: string) => {
  const newColor = await colorModel.create({ name, code });
  return newColor;
};
const getAllColor = async () => {
  const colors = await colorModel.find();
  return colors;
};
interface colorUpdaterProps {
  name?: string;
  code?: string;
}
const updateColor = async (id: string, data: colorUpdaterProps) => {
  validateMongoId(id);
  const colors = await colorModel.findByIdAndUpdate(id, data, { new: true });
  if (colors) {
    throw createError(400, colorErr.ERR_4);
  }
  return colors;
};
const deleteColor = async (id: string) => {
  validateMongoId(id);
  const deleteColor = await colorModel.findByIdAndDelete(id);
  if (!deleteColor) {
    throw createError(400, colorErr.ERR_5);
  }
};
const colorSerive = {
  deleteColor,
  updateColor,
  getAllColor,
  createColor,
};
export default colorSerive;
