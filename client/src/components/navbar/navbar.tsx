import React, { useState, useEffect } from "react";
import { List, ListItem, Menu, MenuItem } from "@mui/material";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { getAllCategory } from "../../features/category/categorySlice";
import Logo from "../../assets/logo.png";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const [anchorEl, setAnChorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnChorEl(null);
  };
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnChorEl(event.currentTarget);
  };
  const handleMenuClickItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnChorEl(null);
  };
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <div className="h-[90px] flex items-center border-b-[1px] shadow-xs shadow-[rgb(248,248,248)]">
      <div className="flex items-center gap-10 w-[80%] mx-auto ">
        <img src={Logo} alt="" className="w-20 h-20 object-contain " />
        <div className="bg-[rgb(248,248,248)] rounded-[25px] h-12 px-3 flex items-center gap-2 ">
          <div
            className="flex items-center justify-between px-3 border-r-[1px] border-[#ccc] w-[200px] text-text-color cursor-pointer"
            onClick={handleClickListItem}
          >
            <div>All Categories</div>
            <div className="cursor-pointer">
              <BsChevronDown />
            </div>
          </div>
          <Menu
            sx={{ width: "300px", marginTop: 2 }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {categories.map((category) => {
              return (
                <div key={category._id}>
                  <MenuItem>
                    <div className="w-[170px]">{category.name}</div>
                  </MenuItem>
                </div>
              );
            })}
          </Menu>
          <input
            placeholder="Search for product"
            className="placeholder:text-md w-[300px] bg-transparent outline-none "
          />
          <button className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
            <BsSearch />
          </button>
        </div>
        <div className="flex items-center gap-[6px] text-sm relative group h-[90px]">
          <span className="group-hover:text-primary">English</span>
          <button className="group-hover:text-primary">
            <BsChevronDown />
          </button>
          <div className="absolute hidden group-hover:flex top-16 left-0 w-40 h-24 bg-white shadow-sm shadow-[#ccc]  flex-col  justify-center pl-3 gap-3 rounded-b-[10px] ">
            <span className="cursor-pointer hover:text-primary">English</span>
            <span className="cursor-pointer hover:text-primary">
              Vietnamese
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[6px]  text-sm relative group h-[90px]">
          <span className="group-hover:text-primary">USD</span>
          <button className="group-hover:text-primary">
            <BsChevronDown />
          </button>
          <div className="absolute hidden group-hover:flex top-16 left-0 w-40 h-24 bg-white shadow-sm shadow-[#ccc]  flex-col  justify-center pl-3 gap-3 rounded-b-[10px] ">
            <span className="cursor-pointer hover:text-primary">USD</span>
            <span className="cursor-pointer hover:text-primary">VND</span>
          </div>
        </div>
        <button className="text-xl hover:text-primary">
          <FaRegUser />
        </button>
        <button className="text-2xl hover:text-primary relative">
          <AiOutlineHeart />
          <span className="absolute -top-2 -right-2 bg-primary text-white w-[20px] h-[20px] flex items-center justify-center text-xs rounded-full">
            2
          </span>
        </button>
        <button className="text-2xl hover:text-primary relative">
          <AiOutlineShoppingCart />
          <span className="absolute -top-2 -right-2 bg-primary text-white w-[20px] h-[20px] flex items-center justify-center text-xs rounded-full">
            2
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
