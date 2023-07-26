import React, { useRef, useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { InputBase } from "@mui/material";
import { BiSolidLockAlt } from "react-icons/bi";
import { FcLock } from "react-icons/fc";
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { ButtonProps, PopoverPassword, LoadingBackDrop } from "../components";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetPassword } from "../features/auth/authSlice";
import { showToastError, showToastSuccess } from "../utils/toast";

interface resetPasswordValues {
  newPassword: string;
  confirmPassword: string;
}
const validateSchema = object().shape({
  newPassword: string()
    .required("New Password is required")
    .min(8, "Your password must be at least 8 characters")
    .matches(/[a-z]/, "Password must be at least 1 lower case letter")
    .matches(/[A-Z]/, "Password must be at least 1 upper case letter")
    .matches(/[0-9]/, "Password must be at least 1 number"),
  confirmPassword: string()
    .required("Confirm Password is required")
    .test("password-match", "Password do not match", function (value) {
      return value === this.resolve(ref("newPassword"));
    }),
});
const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPopoverOpen, setPopverOper] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);
  const [isErrorRequest, setIsErrorRequest] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik<resetPasswordValues>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validateSchema,
    onSubmit(values) {
      dispatch(
        resetPassword({
          token: `${searchParams.get("token")}`,
          userId: `${searchParams.get("userId")}`,
          newPassword: values.newPassword,
        })
      );
    },
  });

  const handleFocus = () => {
    setPopverOper(true);
  };
  const handleBlur = () => {
    setPopverOper(false);
  };

  useEffect(() => {
    if (isSuccessRequest && auth.isSuccess) {
      showToastSuccess("Change Password Successfully");
      navigate("/login");
    }
    setIsSuccessRequest(true);
  }, [auth.isSuccess]);
  useEffect(() => {
    if (isErrorRequest && auth.isError) {
      showToastError("Invalid Link or token expired");
    }
    setIsErrorRequest(true);
  }, [auth.isError]);
  return (
    <div className="flex items-center justify-center h-screen ">
      <Link
        to="/"
        className="absolute  top-10 left-10 flex items-center gap-4 text-lg font-medium cursor-pointer text-gray-color"
      >
        {" "}
        <IoIosArrowBack className="text-2xl " /> Home
      </Link>
      <div className="bg-white rounded-md flex flex-col items-center justify-center  gap-5 shadow-lg shadow-[#a7acba] w-[400px] h-[400px]">
        <FcLock className="text-3xl" />
        <h2 className="text-xl font-semibold">Password Reset</h2>
        <p className="text-sm">Enter new password and then repeat it</p>
        <form onSubmit={formik.handleSubmit} className="w-[80%]">
          <p className="text-[#767c87] mb-2 text-sm">New password</p>
          <div
            className={`flex items-center ring-[2px] ${
              formik.errors.newPassword ? "ring-red-500" : "ring-[#e0e4fd]"
            } ring-[#e0e4fd]  ring-inset  h-[40px] rounded-md relative`}
          >
            <div
              className={`${
                formik.errors.newPassword ? "bg-red-400" : "bg-[#e0e4fd]"
              }  h-full w-[40px] flex items-center justify-center rounded-md text-[#767c87]`}
            >
              <BiSolidLockAlt />
            </div>

            <InputBase
              className="outline-none w-[70%] px-3"
              type={showNewPassword ? "text" : "password"}
              value={formik.values.newPassword}
              name="newPassword"
              onFocus={handleFocus}
              onChange={formik.handleChange}
              onBlur={handleBlur}
            />
            <PopoverPassword
              open={isPopoverOpen}
              targetElement={inputRef.current}
              password={formik.values.newPassword}
            />

            <button
              className="absolute top-[50%] -translate-y-[50%] right-2 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
          <p className="text-[#767c87] my-2 text-sm">Confirm Password</p>
          <div
            className={`flex items-center ring-[2px] ${
              formik.errors.confirmPassword ? "ring-red-500" : "ring-[#e0e4fd]"
            } ring-inset  h-[40px] rounded-md mb-8 relative `}
          >
            <div
              className={`${
                formik.errors.confirmPassword ? "bg-red-400" : "bg-[#e0e4fd]"
              }   h-full w-[40px] flex items-center justify-center rounded-md text-[#767c87]`}
            >
              <BiSolidLockAlt />
            </div>

            <InputBase
              className="outline-none w-[70%] px-3"
              type={showConfirmPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              name="confirmPassword"
              onChange={formik.handleChange}
            />
            <button
              className="absolute top-[50%] -translate-y-[50%] right-2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
            <span className="absolute -bottom-5 text-sm left-0 text-red-500  ">
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </span>
          </div>

          <ButtonProps fullWidth type="submit">
            Save
          </ButtonProps>
        </form>
      </div>
      <LoadingBackDrop open={auth.isLoading} />
    </div>
  );
};

export default ResetPassword;
