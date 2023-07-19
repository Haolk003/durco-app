import React, { useState } from "react";
import { ProductItem } from "..";

const Products: React.FC = () => {
  const [productType, setProductType] = useState<string>("");
  return (
    <div className="bg-white">
      <div className="flex items-center justify-center gap-10 mt-10">
        <h2
          onClick={() => setProductType("seller")}
          className={`${
            productType === "seller" ? "text-primary" : ""
          } text-3xl font-bold cursor-pointer `}
        >
          Bestsellers
        </h2>
        <h2
          onClick={() => setProductType("popular")}
          className={`${
            productType === "popular" ? "text-primary " : ""
          } text-3xl font-bold cursor-pointer`}
        >
          Popular items
        </h2>
      </div>
      <div className="flex flex-wrap w-[80%] mx-auto  mt-10">
        <ProductItem
          image="https://druco-be87.kxcdn.com/druco/wp-content/uploads/2022/04/28-630x630.jpg"
          price={202.58}
          sale={0.47}
          quality={100}
          sold={90}
          title="Valvoline Oil Stockists"
          star={3.5}
        />
        <ProductItem
          image="https://druco-be87.kxcdn.com/druco/wp-content/uploads/2022/04/28-630x630.jpg"
          price={202.58}
          sale={0.47}
          quality={100}
          sold={90}
          title="Valvoline Oil Stockists"
          star={3.5}
        />
        <ProductItem
          image="https://druco-be87.kxcdn.com/druco/wp-content/uploads/2022/04/28-630x630.jpg"
          price={202.58}
          sale={0.47}
          quality={100}
          sold={90}
          title="Valvoline Oil Stockists"
          star={3.5}
        />
        <ProductItem
          image="https://druco-be87.kxcdn.com/druco/wp-content/uploads/2022/04/28-630x630.jpg"
          price={202.58}
          sale={0.47}
          quality={100}
          sold={90}
          title="Valvoline Oil Stockists"
          star={3.5}
        />
        <ProductItem
          image="https://druco-be87.kxcdn.com/druco/wp-content/uploads/2022/04/28-630x630.jpg"
          price={202.58}
          sale={0.47}
          quality={100}
          sold={90}
          title="Valvoline Oil Stockists"
          star={3.5}
        />
        <ProductItem
          image="https://druco-be87.kxcdn.com/druco/wp-content/uploads/2022/04/28-630x630.jpg"
          price={202.58}
          sale={0.47}
          quality={100}
          sold={90}
          title="Valvoline Oil Stockists"
          star={3.5}
        />
        <ProductItem
          image="https://druco-be87.kxcdn.com/druco/wp-content/uploads/2022/04/28-630x630.jpg"
          price={202.58}
          sale={0.47}
          quality={100}
          sold={90}
          title="Valvoline Oil Stockists"
          star={3.5}
        />
      </div>
    </div>
  );
};

export default Products;
