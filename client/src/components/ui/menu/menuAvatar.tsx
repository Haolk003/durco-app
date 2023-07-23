import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Avatar } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { logout } from "../../../features/auth/authSlice";
interface MyMenuProps {
  avatar: string;
}
const MenuAvatar: React.FC<MyMenuProps> = (props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    dispatch(logout(""));
  };
  return (
    <React.Fragment>
      <button onClick={handleMenuOpen}>
        <Avatar alt="avatar" src={props.avatar} />
      </button>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <div className="w-[10 0px]">Profile</div>{" "}
        </MenuItem>
        <MenuItem onClick={signOut}>
          <div className="w-[100px]">Logout</div>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default MenuAvatar;
