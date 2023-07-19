import userModel from "../models/userModel";
import createError from "../utils/createError";
import { userErr } from "../utils/responseMessage";
import validateMongoId from "../validation/validateId";

interface createUserProps {
  userName: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}
interface updateUserProps {
  userName?: string;
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}
const createUser = async (data: createUserProps) => {
  const newUser = await userModel.create(data);
  return newUser;
};
const getAllUser = async () => {
  const users = await userModel.find();
  return users;
};
const getUserById = async (id: string) => {
  await validateMongoId(id);
  const findUser = await userModel.findById(id).populate("category brand");
  if (!findUser) {
    throw createError(400, userErr.ERR_3);
  }
  return findUser;
};
const updateUserById = async (id: string, data: updateUserProps) => {
  await validateMongoId(id);
  const updateUser = await userModel
    .findByIdAndUpdate(id, data)
    .populate("category brand");
  if (!updateUser) {
    throw createError(400, userErr.ERR_4);
  }
  return updateUser;
};
const deleteUserById = async (id: string) => {
  await validateMongoId(id);
  const deleteUser = await userModel.findByIdAndDelete(id);
  if (!deleteUser) {
    throw createError(400, userErr.ERR_5);
  }
  return deleteUser;
};
const userService = {
  deleteUserById,
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
};
export default userService;
