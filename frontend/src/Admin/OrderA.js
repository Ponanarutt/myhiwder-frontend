import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";

const OrderA = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dates = Array(31)
    .fill(0)
    .map((_, i) => i + 1);
  const startDay = 4; // May 1, 2025 is Thursday

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === 2025 && today.getMonth() === 4; // May is month index 4

  return (
    <div className="min-h-screen w-full py-6 bg-transparent">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Left: Calendar */}
        <div className="lg:basis-2/3 w-full bg-white p-8 rounded-xl shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-4 mb-6">
            <h1 className="text-7xl font-bold leading-none tracking-tight text-gray-800">
              May
            </h1>
            <span className="text-3xl text-gray-500 mt-4 sm:mt-0">2025</span>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 border-b pb-2">
            {days.map((day) => (
              <div key={day} className="uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-px mt-2 text-center text-sm text-gray-800">
            {Array(startDay)
              .fill(null)
              .map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="h-24 border border-gray-200 bg-white"
                />
              ))}
            {dates.map((date) => {
              const isToday = isCurrentMonth && date === today.getDate();
              const isPast = isCurrentMonth && date < today.getDate();

              let bgClass = "bg-white";
              if (isToday) {
                bgClass = "bg-red-400 text-white font-bold";
              } else if (isPast) {
                bgClass = "bg-gray-100 text-black";
              }

              return (
                <div
                  key={date}
                  className={`h-24 border border-gray-200 flex items-start justify-start p-2 ${bgClass}`}
                >
                  <span className="text-sm">{date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detail Box */}
        <div className="lg:basis-1/3 w-full bg-white p-6 rounded-xl shadow-xl min-h-[500px] flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              7 MAY 2025
            </h2>
            <p className="text-gray-400 italic mb-4">- description -</p>
          </div>

          {/* กล่องร้านค้า 1 */}
          <div className="border rounded-lg p-4 h-[30%] shadow-sm hover:shadow-md transition">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">
              ร้านข้าวมันไก่เจ๊น้อย
            </h3>
            <IoTrashBinOutline  />
          </div>
            <p className="text-sm text-gray-600">เมนูพิเศษ: ข้าวมันไก่ทอด</p>
          </div>

          {/* กล่องร้านค้า 2 */}
          <div className="border rounded-lg p-4 h-[30%] shadow-sm hover:shadow-md transition">
            <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">
              ร้านไก่ย่างเขาสวนกวาง
            </h3>
            <IoTrashBinOutline  />
            </div>
            <p className="text-sm text-gray-600">เมนูเด็ด: ไก่ย่างสมุนไพร</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderA;
