"use client"
import React from "react";
import { useEffect, useState, useMemo } from "react";
import Header from "./header";

const content = ["0", "1", "2", "3"];

const Homepage = () => {
  const [indexcotent, setindexcontent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setindexcontent((index) => (index + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const buddhistYear = (date.getFullYear() + 543).toString();
      return {
        label: date.toLocaleDateString("th-TH", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        date: date.toISOString().split("T")[0],
        id: `${day}${month}${buddhistYear.slice(-4)}`,
      };
    });
  }, []);

  return (
    <div className="h-[calc(100vh-67px)]  bg-black p-6 font-sans grid grid-rows-[1fr_2fr] gap-6 border rounded-b-2xl border-black">

      <div className="bg-yellow-400 rounded-2xl p-4 text-xl font-bold text-center">
        <div className="overflow-hidden w-full h-40 relative">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${indexcotent * 100}%)` }}
          >
            {content.map((item, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 text-center bg-yellow-400"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {content.map((_, index) => (
            <div
              key={index}
            //   onClick={() => setindexcontent(index)}
              className={`w-3 h-3 rounded-full ${
                indexcotent === index ? "bg-gray-100" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-black rounded-2xl grid grid-cols-10 grid-rows-2 gap-4">
        {days.map((day, index) => (
          <div
            key={day.date}
            className={`p-4 rounded-xl cursor-pointer text-center transition-all duration-200 
                  ${
                    index === 0
                      ? "bg-blue-500 text-white col-span-4 row-span-2"
                      : "bg-white col-span-2 row-span-1"
                  } 
                  ${day.ordered ? "border-2 border-green-500" : ""}`}
          >
            <div className="font-semibold">{day.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
