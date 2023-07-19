import React, { useState } from "react";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";

import { calculate } from "../../utils/calculateSale";

interface productProps {
  image: string;
  title: string;
  star?: number;
  sale?: number;
  price: number;
  sold: number;
  quality: number;
}
//TODOzeqe
const ProductItem = ({
  image,
  title,
  star,
  sale,
  price,
  sold,
  quality,
}: productProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={`bg-white  relative border-border-color-product border-[1px] w-[300px] h-[420px] cursor-pointer`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        className={` h-[420px] ${
          isVisible
            ? "h-[500px] overflow-hidden  z-20 relative bg-white border-b-[2px] border-border-color-product shadow-md shadow-gray-color"
            : ""
        }`}
      >
        {quality > sold ? (
          <span className="bg-sale-color text-white rounded-[25px] px-3 py-1 absolute top-3 left-3 text-sm">
            {sale && sale * 100}%
          </span>
        ) : (
          <span className="bg-sold-out-background text-white  rounded-[25px] px-2 py-1 absolute top-3 left-3 text-xs">
            SOLD OUT
          </span>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" flex-col items-center gap-2  absolute right-2 top-2 flex"
        >
          <motion.button
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              width: isVisible ? "35px" : 0,
            }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-tool-product-bg text-text-color rounded-md w-[35px] h-[35px] flex items-center justify-center"
          >
            <AiOutlineSearch />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              width: isVisible ? "35px" : 0,
            }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-tool-product-bg text-text-color rounded-md w-[35px] h-[35px] flex items-center justify-center"
          >
            <AiOutlineHeart />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              width: isVisible ? "35px" : 0,
            }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-tool-product-bg text-text-color rounded-md w-[35px] h-[35px] flex items-center justify-center"
          >
            <BsArrowRepeat />
          </motion.button>
        </motion.div>
        <img src={image ? image : ""} alt="" className="w-full h-[300px]" />
        <motion.div
          transition={{ duration: 0.3 }}
          className={`px-4 mt-2 py-3 h-[120px]`}
        >
          <h5 className="mb-2 hover:text-primary duration-200">{title}</h5>
          <Rating name="read-only" value={star} readOnly size="small" />
          <div className="flex items-center gap-4">
            <span className="text-price-color text-lg font-[600]">
              ${sale && price && calculate(sale, price)}
            </span>

            <span className="line-through text-gray-color border-gray-color text-sm">
              ${price}
            </span>
          </div>
          {isVisible && (
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: isVisible ? 0 : 50, opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              className="bg-text-color text-primary rounded-[25px] w-full py-3 mt-5 hover:bg-primary hover:text-text-color duration-200"
            >
              {quality > sold ? "ADD TO CARD" : "READ MORE"}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductItem;
