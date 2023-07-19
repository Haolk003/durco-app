import mongoose, { Types } from "mongoose";
import createError from "../utils/createError";
const validateMongoId = (id: string) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw createError(500, "This is not valid or not Found");
  } else {
    return;
  }
};
export default validateMongoId;
