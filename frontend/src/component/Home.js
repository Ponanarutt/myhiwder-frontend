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

      <div className="flex flex-col min-h-screen font-sans w-full">
        {/* พื้นที่โฆษณา */}
        <div className="h-[40vh] bg-gradient-to-b from-[#D4C9BE] to-[#F1EFEC] flex items-center justify-center">
          <p className="text-3xl font-bold text-[#123458] tracking-wide">
            พื้นที่โฆษณา หรือโปรโมชั่นพิเศษ 🍜
          </p>
        </div>
    
        {/* แจ้งเตือน */}
        <div className="h-[10vh] bg-gray-700 bg-opacity-90 text-white flex flex-col items-center justify-center text-center px-4">
          <p className="text-base font-medium">วันนี้คุณสามารถเลือกจองอาหารจากร้านที่เปิดให้บริการด้านล่างได้</p>
          <p className="text-sm text-pink-300">⏰ จองได้ก่อน 9:45 น. เท่านั้น</p>
        </div>
    
        {/* เนื้อหา */}
        <div className="h-[50vh] overflow-y-auto px-6 py-4 bg-[#F1EFEC]">
          <div className="max-w-screen-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-[#123458] text-center">
              มื้อเที่ยงของคุณวันนี้ 🍱
            </h1>
    
            <div className="grid md:grid-cols-2 gap-6 ">
              {shops.map((shop, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg border border-[#D4C9BE] transition hover:shadow-2xl"
                >
                  <h2 className="text-lg font-semibold text-[#123458] mb-3">
                    ร้าน: {shop.shopName}
                  </h2>
    
                  {shop.ordered ? (
                    <div className="text-[#030303] text-sm space-y-1">
                      <p>เมนู: <strong>{shop.order.menu}</strong></p>
                      <p>เผ็ด: {shop.order.spice}</p>
                      <div className="mt-1">
                        <p className="font-semibold text-[#123458] mb-1">ออฟชันที่เลือก:</p>
                        <ul className="list-disc list-inside text-[#030303]">
                          {Object.entries(shop.order.addons)
                            .filter(([_, val]) => val)
                            .map(([k, v]) => (
                              <li key={k}>{k}: {v}</li>
                            ))}
                        </ul>
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
    <div className="space-y-3">
      {/* เมนูหลัก */}
      <select
        className="w-full border rounded px-3 py-2"
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

      {/* ระดับความเผ็ด */}
      <select
        className="w-full border rounded px-3 py-2"
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

      {/* ออฟชันเสริม แยกตามกลุ่ม */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(addonGroups).map(([group, options]) => (
          <select
            key={group}
            className="w-full border rounded px-2 py-1"
            value={addons[group]}
            onChange={(e) => handleAddonChange(group, e.target.value)}
          >
            <option value="">{group}</option>
            {options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* หมายเหตุ */}
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="หมายเหตุ (ถ้ามี)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* ปุ่มส่ง */}
      <button
        onClick={handleSubmit}
        disabled={!menu || !spice}
        className="mt-2 bg-[#123458] text-white px-4 py-2 rounded hover:bg-[#0f2d4b] transition"
      >
        ยืนยันการสั่ง
      </button>
    </div>
  );
};

export default Homepage;
