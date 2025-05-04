"use client";
import React, { useState } from "react";

const CardSlider = () => {
  const [showFirstSet, setShowFirstSet] = useState(false); // false = show 2 & 3

  return (
    <div className="h-[calc(100vh-67px)] w-full bg-whtie p-6 font-sans gap-10 text-black rounded-b-2xl  overflow-hidden ">
      <div
        className={`flex w-[150%] h-full transition-transform duration-700 ease-in-out`}
        style={{
          transform: showFirstSet ? "translateX(0%)" : "translateX(-33.3333%)",
        }}
      >
        {/* Card 1 */}
        <div className="w-1/2 p-4">
          <div
            className={`h-full rounded-xl shadow flex flex-col font-bold text-xl transition-all duration-700 ${
              showFirstSet ? "bg-white opacity-100" : "bg-transparent "
            }`}
          >
             {/* title */}
            <h1>KFC - เเหลมทองพลาซ่า บางเเสน</h1>
            {/* menu select */}
            <div className="flex flex-row flex-wrap item-center ">

               {/* menu n */}
               <div className="w-[40%] border">
                    box 1
               </div>
               <div className="w-[40%] border">
                    box 2
               </div>
               <div className="w-[40%] border">
                    box 3
               </div>
               <div className="w-[40%] border">
                    box 4
               </div>
            </div>

          </div>
        </div>

        {/* Card 2 */}
        <div
          className="w-1/2 p-4 cursor-pointer"
          onClick={() => setShowFirstSet(!showFirstSet)}
        >
          <div className="border h-full rounded-xl shadow gap-5 flex flex-row items-center justify-center font-bold text-xl transition-opacity duration-700">
            <div className="text-[50px]">รายละเอียการด์</div>
            <div>
              <div className="text-5xl">ชื่อร้านค้า</div>
              <div>รายละเอียดร้านค้า</div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-1/2 p-4">
          <div
            className={`h-full rounded-xl shadow flex items-center justify-center font-bold text-xl transition-all duration-700 ${
              !showFirstSet ? "bg-white opacity-100" : "bg-transparent "
            }`}
          >
            InputForm2
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
