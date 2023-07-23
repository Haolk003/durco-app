import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { BsChevronDown } from "react-icons/bs";
const MenuCategories = () => {
  const { categories } = useAppSelector((state) => state.category);
  const [anchorEl, setAnChorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnChorEl(null);
  };
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnChorEl(event.currentTarget);
  };
  const handleMenuClickItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnChorEl(null);
  };
  return (
    <React.Fragment>
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
        open={Boolean(anchorEl)}
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
    </React.Fragment>
  );
};

export default MenuCategories;
