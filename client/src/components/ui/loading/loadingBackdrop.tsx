import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
interface loadingBackdropProps {
  open: boolean;
}
const LoadingBackdrop: React.FC<loadingBackdropProps> = ({ open }) => {
  return (
    <React.Fragment>
      <Backdrop
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default LoadingBackdrop;
