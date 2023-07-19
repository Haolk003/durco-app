import React from "react";

interface TypeProps {
  image: string;
  title: string;
}
const CategoryHomeItem = ({ image, title }: TypeProps) => {
  return (
    <div className="flex flex-col items-center gap-2 group ">
      <div className="w-auto h-[160px] overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-md group-hover:scale-125 duration-100 "
        />
      </div>
      <p className="font-[600] group-hover:text-white duration-100">{title}</p>
    </div>
  );
};

export default CategoryHomeItem;
