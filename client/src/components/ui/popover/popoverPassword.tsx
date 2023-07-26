import React, { useRef, useEffect } from "react";
import { createPopper, Instance } from "@popperjs/core";
import { IoIosClose } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import hasLowerCase from "../../../utils/haslowerCase";
import hasUppercase from "../../../utils/hasUppercase";
import hasNumber from "../../../utils/hasNumber";
interface PopoverComponentProps {
  targetElement: HTMLElement | null;
  open: boolean;
  password: string;
  x?: string;
  y?: string;
}
const PopoverPassword: React.FC<PopoverComponentProps> = ({
  targetElement,
  open,
  password,
  x,
  y,
}) => {
  const popperElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);
  useEffect(() => {
    if (targetElement && popperElement.current && open) {
      popperInstance.current = createPopper(
        targetElement,
        popperElement.current,
        {
          placement: "left",
          modifiers: [
            {
              name: "arrow",
              options: {
                padding: 5, // 5px from the edges of the popper
              },
            },
          ],
        }
      );
    }
    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
      }
    };
  }, [targetElement, open]);
  const checkContain =
    hasLowerCase(password) && hasUppercase(password) && hasNumber(password)
      ? true
      : false;
  return open ? (
    <div ref={popperElement}>
      <div
        className={`bg-border-footer-color py-3 px-3 absolute  -left-56 top-[50%] -left-[${x}] top-[${y}] text-white rounded-md -translate-y-[50%] shadow-md shadow-black `}
      >
        <span className="absolute -right-1 top-[50%] -translate-y-[50%] w-3 h-3 rotate-45 bg-border-footer-color"></span>
        <div className="flex items-center gap-1 text-xs">
          {password.length < 8 ? (
            <div className="w-[9px] h-[9px] rounded-full bg-red-500 flex items-center justify-center text-[30px]">
              <IoIosClose />
            </div>
          ) : (
            <div className="w-[9px] h-[9px] rounded-full bg-green-500 flex items-center justify-center text-[30px]">
              <BsCheck />
            </div>
          )}
          <span
            className={`${
              password.length < 8 ? "text-red-500" : "text-green-500"
            }`}
          >
            At least 8 characters in length
          </span>
        </div>

        <div className="text-xs flex items-center gap-1 ">
          <div className="w-[9px] h-[9px] rounded-full bg-red-500 flex items-center justify-center text-[30px]">
            {checkContain ? (
              <div className="w-[9px] h-[9px] rounded-full bg-green-500 flex items-center justify-center text-[30px]">
                <BsCheck />
              </div>
            ) : (
              <div className="w-[9px] h-[9px] rounded-full bg-red-500 flex items-center justify-center text-[30px]">
                <IoIosClose />
              </div>
            )}
          </div>{" "}
          <span
            className={`${checkContain ? "text-green-500" : "text-red-500"}`}
          >
            Should contain:
          </span>
        </div>
        <ul className="flex flex-col gap-1 ml-2 text-xs mt-1">
          <li className="flex items-center gap-1">
            {!hasLowerCase(password) ? (
              <span className="bg-gray-500 w-[9px] h-[9px] rounded-full"></span>
            ) : (
              <div className="w-[9px] h-[9px] rounded-full bg-green-500 flex items-center justify-center text-[30px]">
                <BsCheck />
              </div>
            )}
            <span>Lower case letters (a-z)</span>
          </li>
          <li className="flex items-center gap-1">
            {!hasUppercase(password) ? (
              <span className="bg-gray-500 w-[9px] h-[9px] rounded-full"></span>
            ) : (
              <div className="w-[9px] h-[9px] rounded-full bg-green-500 flex items-center justify-center text-[30px]">
                <BsCheck />
              </div>
            )}
            <span>Upper case letters (A-Z)</span>
          </li>
          <li className="flex items-center gap-1">
            {!hasNumber(password) ? (
              <span className="bg-gray-500 w-[9px] h-[9px] rounded-full"></span>
            ) : (
              <div className="w-[9px] h-[9px] rounded-full bg-green-500 flex items-center justify-center text-[30px]">
                <BsCheck />
              </div>
            )}
            <span>Numbers (i.e 0-9)</span>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
};

export default PopoverPassword;
