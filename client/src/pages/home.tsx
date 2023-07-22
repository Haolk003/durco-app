import React from "react";
import { Carousel, CategoryHome, ProductSpecial } from "../components";
const Home: React.FC = () => {
  return (
    <div className="pb-10">
      <Carousel />
      <CategoryHome />
      <ProductSpecial />
    </div>
  );
};

export default Home;
