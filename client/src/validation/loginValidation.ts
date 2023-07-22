import { object, string } from "yup";

export const loginValidate = object().shape({
  userName: string().required("Email is required"),
  password: string().required("Password is required"),
});
