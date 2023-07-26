import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { TextField } from "@mui/material";
import { useFormik } from "formik";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import registerImage from "../assets/login-image.png";
import { validateSchema } from "../validation/registerValidation";
import { register } from "../features/auth/authSlice";
import { ButtonProps, PopoverPassword, LoadingBackDrop } from "../components";
import { showToastError, showToastSuccess } from "../utils/toast";

interface MyFormValue {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { message, isSuccess, isError, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const [request, setRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const formik = useFormik<MyFormValue>({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
    },
    validationSchema: validateSchema,
    onSubmit(values) {
      dispatch(register(values));
    },
  });
  const handleFocus = () => {
    setIsPopoverOpen(true);
  };
  const handleBlur = () => {
    setIsPopoverOpen(false);
  };
  useEffect(() => {
    if (isSuccess && requestSuccess) {
      showToastSuccess("Account successfully created");
      navigate(`/account/verify?email=${formik.values.email}`);
    }
    setRequestSuccess(true);
  }, [isSuccess]);
  useEffect(() => {
    if (isError && request) {
      showToastError(message);
    }
    setRequest(true);
  }, [isError]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[900px] h-[650px] rounded-md register-bg relative flex items-center">
        <img src={registerImage} alt="" className="w-[50%] h-auto" />
        <div className="w-[50%] flex items-center justify-center">
          <div className="w-[80%] relative  ">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-[#6a779c] mb-2"
            >
              <IoIosArrowBack /> <span>back</span>
            </Link>
            <div className="bg-white rounded-md w-full">
              <div className="shadow-sm shadow-[#333] flex items-center justify-between px-3 py-3 ">
                <h2 className="text-primary tracking-wider text-[14px]">
                  CREATE AN ACCOUNT
                </h2>
                <Link
                  to="/login"
                  className="text-register-left-bg flex items-center gap-2"
                >
                  <AiOutlineUser /> <span>Sign In</span>
                </Link>
              </div>
              <div className="px-3 py-4 w-full">
                <form
                  className="w-full flex flex-col gap-5  text-md "
                  onSubmit={formik.handleSubmit}
                >
                  <div className="relative">
                    <TextField
                      error={
                        formik.touched.firstName && formik.errors.firstName
                          ? true
                          : false
                      }
                      className="w-full"
                      id="filled-basic"
                      label="First Name*"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      size="small"
                      variant="filled"
                      sx={{ fontSize: "12px" }}
                    />
                    <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                      {formik.touched.firstName && formik.errors.firstName}
                    </span>
                  </div>
                  <div className="relative">
                    <TextField
                      id="filled-error"
                      error={
                        formik.touched.lastName && formik.errors.lastName
                          ? true
                          : false
                      }
                      className="w-full"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      label="Last Name*"
                      variant="filled"
                      size="small"
                    />
                    <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                      {formik.touched.lastName && formik.errors.lastName}
                    </span>
                  </div>
                  <div className="relative">
                    <TextField
                      error={
                        formik.touched.userName && formik.errors.userName
                          ? true
                          : false
                      }
                      className="w-full"
                      name="userName"
                      id="username"
                      label="User Name*"
                      variant="filled"
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                    />
                    <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                      {formik.touched.userName && formik.errors.userName}
                    </span>
                  </div>
                  <div className="relative">
                    <TextField
                      error={
                        formik.touched.email && formik.errors.email
                          ? true
                          : false
                      }
                      className="w-full"
                      name="email"
                      label="Email*"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                      {formik.touched.email && formik.errors.email}
                    </span>
                  </div>
                  <div className="relative mb-2">
                    <TextField
                      error={
                        formik.touched.password && formik.errors.password
                          ? true
                          : false
                      }
                      className="w-full"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      type="password"
                      label="Password"
                      variant="filled"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <PopoverPassword
                      open={isPopoverOpen}
                      password={formik.values.password}
                      targetElement={inputRef.current}
                    />
                    <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                      {formik.touched.password && formik.errors.password}
                    </span>
                  </div>

                  <ButtonProps
                    type="submit"
                    variant="contained"
                    className="bg-register-left-bg "
                  >
                    SIGN UP
                  </ButtonProps>
                </form>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#333] justify-center shadow-md shadow-[#333] mt-4 py-3 rounded-md bg-[rgba(255,255,255,0.1)] cursor-pointer w-[50%] mx-auto">
              <FcGoogle className="text-2xl" />{" "}
              <span className="text-sm">Sign Up with Google</span>{" "}
            </div>
          </div>
        </div>
      </div>
      <LoadingBackDrop open={isLoading} />
    </div>
  );
};

export default Register;
