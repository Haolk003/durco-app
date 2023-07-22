import customFetch from "../../utils/useCallApi";

const login = async (userName: string, password: string) => {
  const users = await customFetch.post(`/auth/login`, { userName, password });
  return users.data;
};
const register = async (
  userName: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
) => {
  const users = await customFetch.post("/auth/register", {
    userName,
    password,
    email,
    firstName,
    lastName,
  });
  return users.data;
};
const forgotPassword = async (email: string) => {
  const response = await customFetch.post("/auth/forgot", { email });
  return response.data;
};
const resetPassword = async (
  userId: string,
  token: string,
  newPassword: string
) => {
  const response = await customFetch.post(
    `/auth/reset-password/${userId}/${token}`,
    { newPassword }
  );
  return response.data;
};
const verifyEmail = async (userId: string, token: string) => {
  const response = await customFetch.post(
    `/auth/verify-email/${userId}/${token}`
  );
  return response.data;
};
const getProfileUser = async () => {
  const response = await customFetch.get("/auth/profile-user");
  return response.data;
};
const logout = async () => {
  const response = await customFetch.post("/auth/logout");
  return response.data;
};
const authService = {
  login,
  register,
  resetPassword,
  forgotPassword,
  verifyEmail,
  getProfileUser,
  logout,
};
export default authService;
