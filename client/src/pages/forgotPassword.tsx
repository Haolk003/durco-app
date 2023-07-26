import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import logo from "../assets/logo.png";
import forgotImage from "../assets/password_reset.png";
import { ButtonProps } from "../components";
import { showToastError, showToastSuccess } from "../utils/toast";
import { forgotPassword } from "../features/auth/authSlice";
import { LoadingBackDrop } from "../components";
const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isSuccess = useAppSelector((state) => state.auth.isSuccess);
  const isError = useAppSelector((state) => state.auth.isError);
  const message = useAppSelector((state) => state.auth.message);

  const [email, setEmail] = useState("");
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      dispatch(forgotPassword(email));
    } else {
      showToastError("Please enter your email");
    }
  };
  useEffect(() => {
    if (isError && isRequestError) {
      showToastError(message);
    }
    setIsRequestError(true);
  }, [isError]);
  useEffect(() => {
    if (isSuccess && isRequestSuccess) {
      setEmail("");
      showToastSuccess("Email has been sent successfully");
    }
    setIsRequestSuccess(true);
  }, [isSuccess]);
  return (
    <div className="flex  flex-col items-center justify-center h-screen">
      <img
        src={logo}
        alt=""
        className="w-[150px] mb-5 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-[500px] bg-white shadow-sm shadow-slate-600 rounded-md px-5 py-5 flex flex-col items-center gap-3">
        <img src={forgotImage} alt="" className="w-[300px] " />
        <h2 className="text-2xl font-semibold text-primary">
          Forgot Password?
        </h2>
        <p className="text-md text-[#333]">Enter your email address</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter email adress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[40px] border-[1px] border-[#ccc] rounded-sm px-2 mb-4"
          />
          <ButtonProps type="submit" fullWidth>
            Continue
          </ButtonProps>
        </form>
      </div>
      {<LoadingBackDrop open={isLoading} />}
    </div>
  );
};

export default ForgotPassword;
