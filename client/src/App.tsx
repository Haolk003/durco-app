import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home, Login, Regiter } from "./pages";
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
        </Routes>
      </BrowserRouter>
      {/* <Letter />
      <Footer /> */}
    </>
  );
}

export default App;
