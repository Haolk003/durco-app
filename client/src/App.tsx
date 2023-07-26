import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import {
  Home,
  Login,
  Regiter,
  VerifyEmail,
  CheckVerify,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import { Layout } from "./components";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/register" element={<Regiter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/verify" element={<VerifyEmail />} />
          <Route path="/account/isVerify" element={<CheckVerify />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
          <Route path="/account/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      {/* <Letter />
      <Footer /> */}
    </>
  );
}

export default App;
