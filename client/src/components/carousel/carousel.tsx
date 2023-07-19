import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { make, engine, model, year, slide } from "../../data/data";
const StyledSwiper = styled(Swiper)`
  /* Tùy chỉnh kiểu dáng của Swiper container */
  width: 100%;
  height: 100%;
  /* Tùy chỉnh kiểu dáng của các slide */
  .swiper-slide {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
  }

  /* Tùy chỉnh kiểu dáng của nút next và prev */
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    overflow: hidden;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: rgba(51, 51, 51, 0.6);

    color: white;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 25px;
  }

  .swiper-button-next {
    right: 60px;
  }

  .swiper-button-prev {
    left: 60px;
  }
  .swiper-pagination-bullet {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: white;
  }
`;
interface MyFormValues {
  make: string;
  model: string;
  year: string;
  engine: string;
}

const Carousel: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      make: make[0].value || "",
      model: model[0].value || "",
      year: year[0].value || "",
      engine: engine[0].value || "",
    },
    onSubmit(values: MyFormValues) {
      console.log(values);
    },
  });
  return (
    <div className=" mx-auto text-center relative ">
      {" "}
      <motion.div
        initial={{ x: -200, y: "-50%" }}
        animate={{ x: 0 }}
        exit={{ x: -200 }}
        transition={{ duration: 0.5 }}
        className="absolute left-52 top-[50%] -translate-y-[50%] rounded-lg bg-white w-[400px] p-3 shadow-md shadow-[#ccc] z-50 "
      >
        <h2 className="font-[600] text-2xl">SEARCH BY VEHICLE</h2>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 mt-5 items-center"
          >
            <Select
              name="make"
              value={formik.values.make}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={formik.handleChange}
              className="w-full"
            >
              {make.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              labelId="demo-simple-select-standard-label"
              name="model"
              value={formik.values.model}
              label="Make"
              onChange={formik.handleChange}
              className="w-full"
            >
              {model.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId="demo-simple-select-standard-label"
              name="year"
              value={formik.values.year}
              label="Make"
              onChange={formik.handleChange}
              className="w-full"
            >
              {year.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId="demo-simple-select-standard-label"
              name="engine"
              value={formik.values.engine}
              label="Make"
              onChange={formik.handleChange}
              className="w-full"
            >
              {engine.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <button className="rounded-[25px] h-[50px] w-[100px] bg-primary ">
              GO
            </button>
          </form>
        </div>
      </motion.div>
      <StyledSwiper
        navigation={true}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Navigation, EffectFade, Autoplay]}
        effect={"fade"}
        className=""
      >
        {" "}
        {slide.map((item, index) => {
          return (
            <SwiperSlide className="ml-16 relative" key={index}>
              {({ isActive }) => (
                <div>
                  <motion.img
                    layout
                    src={item.image}
                    alt=""
                    className="brightness-50"
                    loading="lazy"
                  />
                  <motion.div
                    key={isActive.toString()}
                    initial={{ x: 100, y: "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute right-40 top-[50%] -translate-y-[50%] text-left w-[600px]"
                  >
                    <h4 className="text-white text-xl font-[500]">
                      {item.type}
                    </h4>
                    <h2 className="text-5xl text-white my-5 font-[600] ">
                      {item.title}
                    </h2>
                    <p className="text-white font-[500] text-lg mb-4 ">
                      {item.description}
                    </p>
                    <button className="bg-white rounded-[25px] w-[200px] h-[50px] text-lg font-[500]">
                      Shop Now
                    </button>
                  </motion.div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </StyledSwiper>
    </div>
  );
};

export default Carousel;
