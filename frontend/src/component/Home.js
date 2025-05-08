"use client";
import React, { useState } from "react";

// ร้านอาหารเริ่มต้น (2 ร้าน)
const defaultShops = [
  { shopName: "ข้าวแกงคุณยาย", ordered: false, order: null },
  { shopName: "ก๋วยเตี๋ยวฮ่องเต้", ordered: false, order: null },
];

// กลุ่มออฟชันเสริม
const addonGroups = {
  ประเภท: ["น้ำ", "แห้ง"],
  ข้าว: ["ข้าว", "ไม่เอาข้าว"],
  ไข่: ["ไข่ดาว", "ไข่เจียว"],
  เส้น: ["หมี่เหลือง", "หมี่ขาว", "เส้นเล็ก", "เส้นใหญ่"],
};

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
      className="flex flex-col min-h-screen font-sans w-full "
      style={{ backgroundColor: colors.background }}
    >
      {/* พื้นที่โฆษณา */}
      <div className="h-[25vh]  flex items-center justify-center">
        <p className="text-3xl font-bold text-[#123458] tracking-wide ">
          พื้นที่เเจ้งข่าวสาร
        </p>
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

                {shop.ordered ? (
                  <div className="space-y-3 bg-[#F9F9F9] border border-gray-200 rounded-lg p-4">
                    <div>
                      <p className="text-sm font-semibold text-[#123458]">
                        เมนูที่เลือก:
                      </p>
                      <p className="text-base text-gray-800">
                        {shop.order.menu}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#123458]">
                        ระดับความเผ็ด:
                      </p>
                      <p className="text-base text-gray-800">
                        {shop.order.spice}
                      </p>
                    </div>

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

                    {/* Optional: ปุ่มแก้ไข / ยกเลิก */}
                    <div className="flex gap-2 pt-2">
                      <button className="text-sm text-blue-600 hover:underline">
                        แก้ไข
                      </button>
                      <button className="text-sm text-red-500 hover:underline">
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                ) : (
                  <OrderForm onSubmit={(data) => handleOrder(idx, data)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderForm = ({ onSubmit }) => {
  const [menu, setMenu] = useState("");
  const [spice, setSpice] = useState("");
  const [note, setNote] = useState("");
  const [addons, setAddons] = useState({
    ประเภท: "",
    ข้าว: "",
    ไข่: "",
    เส้น: "",
  });

  const menus = ["ข้าวกะเพรา", "ก๋วยเตี๋ยวน้ำ", "ข้าวไข่เจียว"];
  const spices = ["ไม่เผ็ด", "เผ็ดน้อย", "เผ็ดปกติ"];

  const handleAddonChange = (group, value) => {
    setAddons((prev) => ({ ...prev, [group]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      menu,
      spice,
      addons,
      note,
    });
  };

  return (
    <div className="space-y-4 text-sm text-gray-800">
      {/* เมนูหลัก */}
      <div>
        <label className="block mb-1 font-medium">เมนูหลัก</label>
        <select
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#123458] transition"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        >
          <option value="">เลือกเมนู</option>
          {menus.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* ระดับความเผ็ด */}
      <div>
        <label className="block mb-1 font-medium">ระดับความเผ็ด</label>
        <select
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#123458] transition"
          value={spice}
          onChange={(e) => setSpice(e.target.value)}
        >
          <option value="">เลือกระดับความเผ็ด</option>
          {spices.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* ออฟชันเสริม */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(addonGroups).map(([group, options]) => (
          <div key={group}>
            <label className="block mb-1 font-medium">{group}</label>
            <select
              className="block w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#123458] transition"
              value={addons[group]}
              onChange={(e) => handleAddonChange(group, e.target.value)}
            >
              <option value="">เลือก {group}</option>
              {options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>


   
      {/* ปุ่มส่ง */}
      <button
        onClick={handleSubmit}
        disabled={!menu || !spice}
        className="w-full bg-[#123458] text-white font-semibold py-2 rounded-lg hover:bg-[#0f2d4b] transition disabled:opacity-50"
      >
        ยืนยันการสั่ง
      </button>
    </div>
  );
};

export default Homepage;
