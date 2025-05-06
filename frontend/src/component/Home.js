"use client";
import React, { useState } from "react";

const defaultShops = [
  { shopName: "ข้าวแกงคุณยาย", ordered: false, order: null },
  { shopName: "ก๋วยเตี๋ยวฮ่องเต้", ordered: false, order: null },
];

const addonGroups = {
  ประเภท: ["น้ำ", "แห้ง"],
  ข้าว: ["ข้าว", "ไม่เอาข้าว"],
  ไข่: ["ไข่ดาว", "ไข่เจียว"],
  เส้น: ["หมี่เหลือง", "หมี่ขาว", "เส้นเล็ก", "เส้นใหญ่"]
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
    <div className="w-full min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">มื้อเที่ยงของคุณวันนี้ 🍱</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {shops.map((shop, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">ร้าน: {shop.shopName}</h2>

            {shop.ordered ? (
              <div className="text-gray-700">
                <p>เมนู: <strong>{shop.order.menu}</strong></p>
                <p>เผ็ด: {shop.order.spice}</p>
                <p>
                  ออฟชัน:{" "}
                  {Object.entries(shop.order.addons)
                    .filter(([_, val]) => val)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(", ")}
                </p>
                <p>หมายเหตุ: {shop.order.note}</p>
                <p className="mt-2 text-pink-600 font-semibold">ราคา: ฿{shop.order.price}</p>
              </div>
            ) : (
              <OrderForm onSubmit={(data) => handleOrder(idx, data)} />
            )}
          </div>
        ))}
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
      price: 65,
    });
  };

  return (
    <div className="space-y-3">
      <select
        className="w-full border rounded px-3 py-2"
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
      >
        <option value="">เลือกเมนู</option>
        {menus.map((m, i) => (
          <option key={i} value={m}>{m}</option>
        ))}
      </select>

      <select
        className="w-full border rounded px-3 py-2"
        value={spice}
        onChange={(e) => setSpice(e.target.value)}
      >
        <option value="">เลือกระดับความเผ็ด</option>
        {spices.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

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
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        ))}
      </div>

      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="หมายเหตุ (ถ้ามี)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={!menu || !spice}
        className="mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        ยืนยันการสั่ง
      </button>
    </div>
  );
};

export default Homepage;
