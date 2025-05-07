import React, { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

// กำหนด Theme colors
const colors = {
  bgLight: "rgb(241, 239, 236)",
  accent: "rgb(212, 201, 190)",
  primary: "rgb(18, 52, 88)",
  text: "rgb(3, 3, 3)"
};

// ข้อมูลร้านค้าตามวันที่
const initialShopsByDate = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [
    { id: 1, name: "ร้านข้าวมันไก่เจ๊น้อย", specialty: "ข้าวมันไก่ทอด" },
    { id: 2, name: "ร้านไก่ย่างเขาสวนกวาง", specialty: "ไก่ย่างสมุนไพร" }
  ],
  8: [{ id: 3, name: "ร้านข้าวหมูแดงนายฮุย", specialty: "ข้าวหมูกรอบ" }],
  9: [],
  10: [{ id: 4, name: "ก๋วยเตี๋ยวเรืออยุธยา", specialty: "ก๋วยเตี๋ยวหมูน้ำตก" }],
  11: [],
  12: [{ id: 5, name: "ข้าวแกงป้าน้อย", specialty: "แกงเขียวหวานไก่" }],
  13: [],
  14: [{ id: 6, name: "เจ๊แดงซีฟู้ด", specialty: "ข้าวผัดปู" }],
  15: [{ id: 7, name: "ร้านกะเพราถาดพี่ใหญ่", specialty: "กะเพราหมูสับถาด" }],
  16: [],
  17: [],
  18: [],
  19: [{ id: 8, name: "ส้มตำป้าติ๋ม", specialty: "ตำปูปลาร้า" }],
  20: [{ id: 9, name: "หมูกรอบเจ๊หน่อย", specialty: "ข้าวหมูกรอบราดน้ำ" }],
  21: [],
  22: [{ id: 10, name: "ข้าวต้มโต้รุ่ง", specialty: "ข้าวต้มหมู" }],
  23: [],
  24: [],
  25: [],
  26: [],
  27: [],
  28: [],
  29: [],
  30: [],
  31: []
};

// ข้อมูลร้านค้าทั้งหมด
const availableShops = [
  { id: 1, name: "ร้านข้าวมันไก่เจ๊น้อย", specialty: "ข้าวมันไก่ทอด" },
  { id: 2, name: "ร้านไก่ย่างเขาสวนกวาง", specialty: "ไก่ย่างสมุนไพร" },
  { id: 3, name: "ร้านข้าวหมูแดงนายฮุย", specialty: "ข้าวหมูกรอบ" },
  { id: 4, name: "ก๋วยเตี๋ยวเรืออยุธยา", specialty: "ก๋วยเตี๋ยวหมูน้ำตก" },
  { id: 5, name: "ข้าวแกงป้าน้อย", specialty: "แกงเขียวหวานไก่" },
  { id: 6, name: "เจ๊แดงซีฟู้ด", specialty: "ข้าวผัดปู" },
  { id: 7, name: "ร้านกะเพราถาดพี่ใหญ่", specialty: "กะเพราหมูสับถาด" },
  { id: 8, name: "ส้มตำป้าติ๋ม", specialty: "ตำปูปลาร้า" },
  { id: 9, name: "หมูกรอบเจ๊หน่อย", specialty: "ข้าวหมูกรอบราดน้ำ" },
  { id: 10, name: "ข้าวต้มโต้รุ่ง", specialty: "ข้าวต้มหมู" }
];

// สร้างสีสำหรับร้านค้าแต่ละร้าน
const shopColors = {
  1: "#FFC3A0", // สีส้มอ่อน
  2: "#FFAFCC", // สีชมพู
  3: "#A0C4FF", // สีฟ้าอ่อน
  4: "#9BF6FF", // สีฟ้าสว่าง
  5: "#CAFFBF", // สีเขียวอ่อน
  6: "#FDFFB6", // สีเหลืองอ่อน
  7: "#BDB2FF", // สีม่วงอ่อน
  8: "#FFD6A5", // สีส้มอมเหลือง
  9: "#FFFFFC", // สีขาวนวล
  10: "#CBBAED" // สีม่วงซีด
};

const OrderA = () => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = Array(31).fill(0).map((_, i) => i + 1);
  const startDay = 4; // May 1, 2025 is Thursday (0=Sunday, 4=Thursday)

  const [selectedDate, setSelectedDate] = useState(7); // เริ่มต้นที่วันที่ 7
  const [shopsByDate, setShopsByDate] = useState(initialShopsByDate);
  const [showShopSelector, setShowShopSelector] = useState(false);

  // คำนวณวันที่ปัจจุบัน
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === 2025 && today.getMonth() === 4; // May is month index 4

  // เลือกวันที่
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowShopSelector(false);
  };

  // ลบร้านค้าออกจากวันที่
  const removeShopFromDate = (date, shopId) => {
    const updatedShops = { ...shopsByDate };
    updatedShops[date] = updatedShops[date].filter(shop => shop.id !== shopId);
    setShopsByDate(updatedShops);
  };

  // เพิ่มร้านค้าในวันที่
  const addShopToDate = (date, shop) => {
    if (!shopsByDate[date].some(s => s.id === shop.id)) {
      const updatedShops = { ...shopsByDate };
      updatedShops[date] = [...updatedShops[date], shop];
      setShopsByDate(updatedShops);
      setShowShopSelector(false);
    }
  };

  // ฟอร์แมตวันที่
  const formatDate = (date) => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${date} MAY 2025`;
  };

  // ช่วยในการแสดงร้านค้าในปฏิทิน
  const renderShopPills = (date) => {
    const shops = shopsByDate[date] || [];
    if (shops.length === 0) return null;

    // แสดงเพียง 2 ร้านแรก และถ้ามีมากกว่านั้นให้แสดงเป็น +X
    return (
      <div className="mt-1 flex flex-col gap-1">
        {shops.slice(0, 2).map(shop => (
          <div 
            key={shop.id} 
            className="text-xs px-2 py-0.5 rounded-full truncate" 
            style={{ 
              backgroundColor: shopColors[shop.id] || colors.accent,
              color: colors.text,
              maxWidth: "100%",
              fontSize: "0.65rem"
            }}
          >
            {shop.name}
          </div>
        ))}
        {shops.length > 2 && (
          <div className="text-xs text-gray-600 font-medium">+{shops.length - 2} more</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full py-6" style={{ backgroundColor: colors.bgLight }}>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Left: Calendar */}
        <div className="lg:basis-2/3 w-full bg-white p-8 rounded-xl shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-4 mb-6">
            <h1 className="text-7xl font-bold leading-none tracking-tight" style={{ color: colors.primary }}>
              May
            </h1>
            <span className="text-3xl text-gray-500 mt-4 sm:mt-0">2025</span>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-sm font-semibold mb-2" style={{ color: colors.primary }}>
            {days.map((day) => (
              <div key={day} className="uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1 mt-2 text-center">
            {Array(startDay)
              .fill(null)
              .map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="h-24 border border-gray-100 bg-white"
                />
              ))}
            {dates.map((date) => {
              const isToday = isCurrentMonth && date === today.getDate();
              const isPast = isCurrentMonth && date < today.getDate();
              const isSelected = date === selectedDate;
              
              let dateClasses = "h-24 border flex flex-col p-1 cursor-pointer transition-all overflow-hidden";
              
              if (isSelected) {
                dateClasses += " border-2 border-blue-500 shadow-md";
              } else if (isToday) {
                dateClasses += " bg-red-50 border-red-200";
              } else if (isPast) {
                dateClasses += " bg-gray-50 text-gray-400";
              } else {
                dateClasses += " border-gray-100 hover:border-gray-300";
              }

              return (
                <div
                  key={date}
                  className={dateClasses}
                  onClick={() => handleDateClick(date)}
                >
                  <div className="flex justify-between items-center">
                    <span 
                      className={`text-sm font-medium ${isToday ? 'bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center' : ''}`}
                    >
                      {date}
                    </span>
                    {shopsByDate[date]?.length > 0 && (
                      <span className="text-xs bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center">
                        {shopsByDate[date].length}
                      </span>
                    )}
                  </div>
                  
                  {/* แสดงร้านค้าเป็นวงรี */}
                  {renderShopPills(date)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detail Box */}
        <div className="lg:basis-1/3 w-full bg-white p-6 rounded-xl shadow-xl min-h-[500px] flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
              {formatDate(selectedDate)}
            </h2>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                {shopsByDate[selectedDate]?.length > 0 
                  ? `${shopsByDate[selectedDate].length} ร้านค้าในวันนี้` 
                  : "ยังไม่มีร้านค้าในวันนี้"}
              </p>
              <button 
                onClick={() => setShowShopSelector(!showShopSelector)}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: colors.primary }}
              >
                <IoMdAdd />
                เพิ่มร้าน
              </button>
            </div>
          </div>

          {/* รายการร้านค้าในวันที่เลือก */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {shopsByDate[selectedDate]?.length > 0 ? (
              shopsByDate[selectedDate].map(shop => (
                <div 
                  key={shop.id} 
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  style={{ borderColor: shopColors[shop.id] || colors.accent, borderLeftWidth: '4px' }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold" style={{ color: colors.text }}>
                      {shop.name}
                    </h3>
                    <button 
                      onClick={() => removeShopFromDate(selectedDate, shop.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <IoTrashBinOutline />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">เมนูแนะนำ: {shop.specialty}</p>
                </div>
              ))
            ) : !showShopSelector ? (
              <div className="flex items-center justify-center h-40 text-gray-400 italic">
                กดปุ่ม "เพิ่มร้าน" เพื่อเลือกร้านค้าสำหรับวันนี้
              </div>
            ) : null}
          </div>

          {/* ตัวเลือกร้านค้า */}
          {showShopSelector && (
            <div className="border-t pt-3 mt-2">
              <h3 className="font-medium text-sm mb-2" style={{ color: colors.primary }}>เลือกร้านค้าที่ต้องการเพิ่ม:</h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {availableShops
                  .filter(shop => !shopsByDate[selectedDate]?.some(s => s.id === shop.id))
                  .map(shop => (
                    <div 
                      key={shop.id}
                      onClick={() => addShopToDate(selectedDate, shop)}
                      className="p-2 border rounded cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                    >
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: shopColors[shop.id] || colors.accent }}
                      ></div>
                      <span>{shop.name}</span>
                    </div>
                  ))}
                {availableShops.length === shopsByDate[selectedDate]?.length && (
                  <div className="text-gray-400 italic text-center py-2">
                    ไม่มีร้านค้าให้เลือกเพิ่มเติม
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderA;
