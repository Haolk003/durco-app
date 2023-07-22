import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { TextField } from "@mui/material";
import { useFormik } from "formik";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import loginImage from "../assets/register-image.png";
import { loginValidate } from "../validation/loginValidation";
import { login } from "../features/auth/authSlice";
import { ButtonProps } from "../components";
import { showToastError, showToastSuccess } from "../utils/toast";

interface MyFormValue {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, isSuccess, isError } = useAppSelector((state) => state.auth);
  const [request, setRequest] = useState(false);
  const formik = useFormik<MyFormValue>({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginValidate,
    onSubmit(values, formikHelpers) {
      console.log(values);
      dispatch(login(values));
    },
  });
  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_HOST}/auth/google`, "_self");
  };
  useEffect(() => {
    console.log(message);
  }, [message]);
  useEffect(() => {
    if (isSuccess) {
      showToastSuccess("Account successfully created");
    }
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
        <img src={loginImage} alt="" className="w-[50%] h-auto" />
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
                  ADREADY MEMBERS
                </h2>
                <button className="text-register-left-bg flex items-center gap-2">
                  <AiOutlineUser /> <span>Sign Up</span>
                </button>
              </div>
              <div className="px-3 py-4 w-full">
                <form
                  className="w-full flex flex-col gap-5  text-md "
                  onSubmit={formik.handleSubmit}
                >
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
                    />
                    <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                      {formik.touched.password && formik.errors.password}
                    </span>
                  </div>
                  <span className="text-center text-text-footer-color cursor-pointer font-[300] ">
                    Forgot password?
                  </span>
                  <ButtonProps
                    type="submit"
                    variant="contained"
                    className="bg-register-left-bg "
                  >
                    SIGN IN
                  </ButtonProps>
                </form>
              </div>
            </div>
            <div
              onClick={googleLogin}
              className="flex items-center gap-2 text-[#333] justify-center shadow-md shadow-[#333] mt-4 py-3 rounded-md bg-[rgba(255,255,255,0.1)] cursor-pointer w-[50%] mx-auto"
            >
              <FcGoogle className="text-2xl" />{" "}
              <span className="text-sm">Sign In with Google</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
