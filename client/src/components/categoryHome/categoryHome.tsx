import React, { useRef, RefObject, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { Virtual } from "swiper/modules";

import { categoryData } from "../../data/category";
import CategoryHomeItem from "./categoryHomeItem";

import "swiper/css";
import "swiper/css/navigation";

type SwiperRef = SwiperType;
const CategoryHome: React.FC = () => {
  const [swiperRef, setSwipeRef] = useState<SwiperRef | null>(null);
  const nextSlice = () => {
    swiperRef?.slideNext();
  };
  const prevSlice = () => {
    swiperRef?.slidePrev();
  };
  return (
    <div className="bg-primary py-10">
      <div className="w-[80%] mx-auto overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-[600]">Categories</h2>
            <h4 className="text-lg">MARCH FAVORIVES</h4>
            <div className="flex items-center gap-2">
              <button
                className="bg-[rgba(255,255,255,0.5)] w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-white  duration-100"
                onClick={prevSlice}
              >
                <FiArrowLeft />
              </button>
              <button
                onClick={nextSlice}
                className="bg-[rgba(255,255,255,0.5)] w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-white duration-100 "
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <div className="w-[80%]">
            <Swiper
              onSwiper={setSwipeRef}
              slidesPerView={5}
              scrollbar={{ draggable: true }}
              spaceBetween={30}
              virtual
              modules={[Virtual]}
              loop={true}
              // className=""
            >
              {categoryData.map((item) => {
                return (
                  <SwiperSlide key={uuid4()}>
                    <CategoryHomeItem image={item.image} title={item.title} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
