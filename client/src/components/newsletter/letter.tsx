import React from "react";

const Letter: React.FC = () => {
  return (
    <div className="bg-primary text-border-footer-color h-[130px]">
      <div className="w-[80%] mx-auto flex items-center justify-between h-full">
        <div>
          <h2 className="text-4xl font-[700]">Newsletter</h2>
          <p>Subcribe to our Newsletter get 10% discount code</p>
        </div>
        <div className="border-border-footer-color border-[1px] w-[500px] rounded-full flex items-center justify-between py-1 pl-4 px-[6px]">
          <input
            type="text"
            placeholder="Your e-mail address"
            className="bg-transparent placeholder:text-border-footer-color  outline-none w-[calc(100% - 150px)]"
          />
          <button className="bg-border-footer-color text-white rounded-[25px] h-[50px] w-[150px]">
            SUBCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Letter;
