import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { verifyEmail } from "../features/auth/authSlice";

import Logo from "../assets/logo.png";
import emailSuccess from "../assets/email-success.png";
import verifyError from "../assets/verify-err.jpg";
const CheckVerify: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      verifyEmail({
        token: `${searchParams.get("token")}`,
        userId: `${searchParams.get("userId")}`,
      })
    );
  }, [searchParams]);
  return (
    <div>
      {!isLoading ? (
        isSuccess ? (
          <div className="flex flex-col items-center gap-3">
            <img
              onClick={() => navigate("/")}
              src={Logo}
              alt=""
              className="w-[200px] h-auto mt-14"
            />
            <h2 className="text-2xl font-medium">
              Email successfully verified!
            </h2>
            <img src={emailSuccess} alt="" className="w-[400px] h-auto" />
            <button
              className="bg-primary px-5 py-2 rounded-full text-lg font-semibold"
              onClick={() => navigate("/login")}
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <img
              onClick={() => navigate("/")}
              src={Logo}
              alt=""
              className="w-[200px] h-auto mt-14 cursor-pointer"
            />
            <h2 className="text-3xl font-semibold text-red-500 mt-2">
              Email verify failured!
            </h2>
            <img src={verifyError} alt="" className="w-[300px] h-auto" />
            <button
              className="bg-primary px-5 py-2 rounded-full text-lg font-semibold"
              onClick={() => navigate("/login")}
            >
              Sign Up
            </button>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CheckVerify;
