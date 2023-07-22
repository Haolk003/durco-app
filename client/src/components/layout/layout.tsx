import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer, Letter } from "..";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Letter />
      <Footer />
    </div>
  );
};

export default Layout;
