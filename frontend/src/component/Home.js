"use client";
import React, { useEffect, useState } from "react";
import OrderForm from "./OrderForm";


// ร้านอาหารเริ่มต้น (2 ร้าน)
const defaultShops = [
  { shopName: "ข้าวแกงคุณยาย", ordered: false, order: null, isEditing: false },
  {
    shopName: "ก๋วยเตี๋ยวฮ่องเต้",
    ordered: false,
    order: null,
    isEditing: false,
  },
];

const colors = {
  background: "#f9f9f9",
  headerBackground: "#0a2240", // สีน้ำเงินเข้มสำหรับส่วนหัวตาราง
  headerText: "#ffffff",
  rowEven: "#ffffff",
  rowOdd: "#f5f5f5",
  text: "#333333",
  border: "#e0e0e0",
  selectBg: "#ffffff",
  borderRow: "#e5e5e5", // สีเส้นแบ่งแถว
};

const Homepage = () => {
  const [shops, setShops] = useState(defaultShops);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // 👉 Your fetch or data refresh logic here
  //     console.log("Fetching or updating data...");
  
  //     // Example: call an API and update `shops`
  //     // fetch('/api/shops').then(res => res.json()).then(data => setShops(data));
  //   }, 5000); // every 5000ms (5 seconds)
  
  //   // 🧹 Cleanup function to clear interval when component unmounts
  //   return () => clearInterval(interval);
  // }, []);
  

  const handleEdit = (idx) => {
    const updated = [...shops];
    updated[idx].isEditing = true;
    setShops(updated);
  };

  const handleCancel = (idx) => {
    const updated = [...shops];
    updated[idx] = {
      shopName: shops[idx].shopName, // คงชื่อร้านไว้
      ordered: false,
      order: null,
      isEditing: false,
    };
    setShops(updated);
  };

  const handleReorder = (idx, orderData) => {
    const updated = [...shops];
    updated[idx] = {
      ...updated[idx],
      ordered: true,
      order: orderData,
      isEditing: false,
    };
    setShops(updated);
  };

  const handleOrder = (idx, orderData) => {
    const updated = [...shops];
    updated[idx] = {
      ...updated[idx],
      ordered: true,
      order: orderData,
    };
    setShops(updated);
  };



  return (

  
    <div
      className="flex flex-col min-h-screen font-sans w-full min-w-[300px]  "
      style={{ backgroundColor: colors.background }}
    >
      {/* พื้นที่โฆษณา */}
      <div className="h-[25vh] flex-col sm:flex-row   flex items-center justify-center gap-7">
        <h1 className="hidden sm:flex text-sm sm:text-[40px] lg:text-[80px] font-mono">Leave rights</h1>
        <img src="copy5.png" className="w-[80%] sm:w-[25%]" />
      </div>

      {/* แจ้งเตือน */}
      <div className="h-[10vh] bg-gray-700 bg-opacity-90 text-white flex flex-col items-center justify-center text-center px-4">
        <p className="text-base font-medium">
          วันนี้คุณสามารถเลือกจองอาหารจากร้านที่เปิดให้บริการด้านล่างได้
        </p>
        <p className="text-sm text-pink-300">⏰ จองได้ก่อน 9:45 น. เท่านั้น</p>
      </div>

      {/* เนื้อหา */}
      <div
        className="h-[65vh] overflow-y-auto px-6 py-4 "
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-bold mt-4 mb-6 text-[#123458] text-center">
            ร้านอาหารที่เปิดให้บริการวันนี้
          </h1>

          <div className="grid md:grid-cols-2 gap-6 ">
            {shops.map((shop, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg border border-[#D4C9BE] transition hover:shadow-2xl"
              >
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                  ร้าน: {shop.shopName}
                </h2>

                {shop.ordered && !shop.isEditing ? (
                  <div className="space-y-4 bg-[#F9F9F9] border border-gray-200 rounded-lg p-4">
                    <div>
                      <p className="text-sm font-semibold text-[#123458] mb-1">
                        เมนูที่เลือก:
                      </p>
                      <p className="text-base text-gray-800">
                        {shop.order.menu}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#123458] mb-1">
                        ระดับความเผ็ด:
                      </p>
                      <p className="text-base text-gray-800">
                        {shop.order.spice}
                      </p>
                    </div>

                    {shop.order.vegetable && (
                      <div>
                        <p className="text-sm font-semibold text-[#123458] mb-1">
                          กินผักมั้ย:
                        </p>
                        <p className="text-base text-gray-800">
                          {shop.order.vegetable}
                        </p>
                      </div>
                    )}

                    {shop.order.portion && (
                      <div>
                        <p className="text-sm font-semibold text-[#123458] mb-1">
                          พิเศษมั้ย:
                        </p>
                        <p className="text-base text-gray-800">
                          {shop.order.portion}
                        </p>
                      </div>
                    )}

                    {shop.order.addons &&
                      Object.values(shop.order.addons).some((val) => val) && (
                        <div>
                          <p className="text-sm font-semibold text-[#123458] mb-1">
                            ออฟชันที่เลือก:
                          </p>
                          <ul className="list-disc list-inside text-gray-700">
                            {Object.entries(shop.order.addons)
                              .filter(([_, val]) => val)
                              .map(([k, v]) => (
                                <li key={k}>
                                  {k}: {v}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                    <div className="flex gap-4 pt-3">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => handleEdit(idx)}
                      >
                        แก้ไข
                      </button>
                      <button
                        className="text-sm text-red-500 hover:underline"
                        onClick={() => handleCancel(idx)}
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                ) : (
                  <OrderForm
                    onSubmit={(data) =>
                      shop.ordered
                        ? handleReorder(idx, data)
                        : handleOrder(idx, data)
                    }
                    initialData={shop.order}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};


export default Homepage;
