import { object, string } from "yup";
export const validateSchema = object().shape({
  firstName: string()
    .matches(
      /^[a-zA-Z]+$/,
      "First Name can only contain characters and numbers"
    )
    .required("First Name is required"),
  lastName: string()
    .matches(/^[a-zA-Z]+$/, "Last Name can only contain characters and numbers")
    .required("Last Name is required"),
  email: string().email("Email not valid").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must be at least 1 lower case letter")
    .matches(/[A-Z]/, "Password must be at least 1 upper case letter")
    .matches(/[0-9]/, "Password must be at least 1 number"),
  userName: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username can only contain characters and numbers"
    )
    .required("userName is required"),
});
