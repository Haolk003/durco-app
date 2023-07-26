import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import Logo from "../assets/logo.png";
import emailImage from "../assets/email-verify.png";
const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-[500px] border-t-[5px] border-primary flex flex-col items-center gap-5 shadow-md shadow-[#ccc] p-3">
        <img
          src={Logo}
          alt=""
          className="w-[150px] h-auto mt-4"
          onClick={() => navigate("/")}
        />
        <h2 className="text-2xl font-[600] ">Greate, now verify your email</h2>
        <img src={emailImage} alt="" className="w-[200px] h-auto" />
        <p>
          Check your inbox at{" "}
          <span className="font-[600]">{searchParams.get("email")}</span> and
          click the verification link inside to complete your registration. This
          link will expire shorty, so verify soon!
        </p>
        <p className="text-gray-800">
          <span className="font-[600]">Don't see an emai?</span> Check your spam
          folder.
        </p>
        <div>
          Link expired?{" "}
          <button className="text-resend-verify_email-color underline ">
            Resend verification email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
