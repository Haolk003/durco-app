import React from "react";
import { Navbar, Carousel, CategoryHome, ProductSpecial } from "../components";
const Home: React.FC = () => {
  return (
    <div className="pb-10">
      <Navbar />
      <Carousel />
      <CategoryHome />
      <ProductSpecial />
    </div>
  );
};

export default Home;
