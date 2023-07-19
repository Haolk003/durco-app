import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaSquarePinterest } from "react-icons/fa6";
import PaymentImg from "../../assets/payment.png";
const Footer: React.FC = () => {
  return (
    <div className="bg-black w-full text-text-footer-color">
      <div className="flex justify-between w-[80%] mx-auto py-14">
        <div className="flex flex-col gap-4 w-[30%]">
          <h2 className="text-xl font-[600] text-white">SAY HELLO</h2>
          <p>
            Address: 1234 Heaven Stress, Beverly Hill Old York- United State of
            Lorem
          </p>
          <p>Phone: +84 582 847 760</p>
          <p>Email:nguyenquochaolop91@gmail.com</p>
          <div className="flex items-center gap-5 text-xl mt-2">
            <div className="cursor-pointer hover:bg-[#4267B2] hover:text-white w-[35px] h-[35px] rounded-full flex items-center justify-center hover:-translate-y-1 duration-200">
              <FaFacebookF />
            </div>
            <div className="cursor-pointer hover:bg-[#FF0000] hover:text-white w-[35px] h-[35px] rounded-full flex items-center justify-center hover:-translate-y-1 duration-200">
              <FaYoutube />
            </div>
            <div className="cursor-pointer hover:bg-[#1DA1F2] hover:text-white w-[35px] h-[35px] rounded-full flex items-center justify-center hover:-translate-y-1 duration-200">
              <FaTwitter />
            </div>
            <div className="cursor-pointer hover:bg-[#E60023] hover:text-white w-[35px] h-[35px] rounded-full flex items-center justify-center hover:-translate-y-1 duration-200">
              <FaSquarePinterest />
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-white text-xl font-[600]">MY ACCOUNT</h2>
          <ul className="flex flex-col gap-3">
            <li className="hover:text-primary cursor-pointer duration-100">
              About
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Advertising
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Business Development
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Careers
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Permissions
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Contact
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-xl font-[600] mb-4">PRODUCT</h2>
          <ul className="flex flex-col gap-3">
            <li className="hover:text-primary cursor-pointer duration-100">
              About
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Advertising
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Business Development
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Careers
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Permissions
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Contact
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-xl font-[600] mb-4">
            HEADER SERVICES
          </h2>
          <ul className="flex flex-col gap-3">
            <li className="hover:text-primary cursor-pointer duration-100">
              About
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Advertising
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Business Development
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Careers
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Permissions
            </li>
            <li className="hover:text-primary cursor-pointer duration-100">
              Contact
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-[2px] border-border-footer-color flex items-center justify-end h-[60px] ">
        <img src={PaymentImg} alt="" className="mr-10" />
      </div>
    </div>
  );
};

export default Footer;
