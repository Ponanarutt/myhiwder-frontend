"use cleint"

import React from 'react'
import { useState } from 'react';

const OrderForm = ({ onSubmit, initialData }) => {
    const safeData = initialData || {};

    const addonGroups = {
        ประเภท: ["น้ำ", "แห้ง"],
        ข้าว: ["ข้าว", "ไม่เอาข้าว"],
        ไข่: ["ไข่ดาว", "ไข่เจียว"],
        เส้น: ["หมี่เหลือง", "หมี่ขาว", "เส้นเล็ก", "เส้นใหญ่"],
      };

    const [menu, setMenu] = useState(safeData.menu || "");
    const [spice, setSpice] = useState(safeData.spice || "");
    const [vet, setvet] = useState(safeData.vegetable || "");
    const [spacial, setspacial] = useState(safeData.portion || "");
    const [note, setNote] = useState(safeData.note || "");
    const [addons, setAddons] = useState(
      safeData.addons || {
        ประเภท: "",
        ข้าว: "",
        ไข่: "",
        เส้น: "",
      }
    );
  
    const menus = ["ข้าวกะเพรา", "ก๋วยเตี๋ยวน้ำ", "ข้าวไข่เจียว"];
    const spices = ["ไม่เผ็ด", "เผ็ดน้อย", "เผ็ดปกติ"];
    const vegetable_option = ["รับ", "ไม่รับ"];
    const portion_type = ["รับ", "ไม่รับ"];
  
    const handleAddonChange = (group, value) => {
      setAddons((prev) => ({ ...prev, [group]: value }));
    };
  
    const handleSubmit = () => {
      onSubmit({
        menu,
        spice,
        addons,
        note,
        vegetable: vet,
        portion: spacial,
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
        <div className="w-full flex flex-row justify-between">
          <div className="w-[48%]">
            <label className="block mb-1 font-medium">กินผักมั้ย ?</label>
            <select
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#123458] transition"
              value={vet}
              onChange={(e) => setvet(e.target.value)}
            >
              <option value="">เลือกกินผักมั้ย</option>
              {vegetable_option.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
  
          <div className="w-[48%]">
            <label className="block mb-1 font-medium">พิเศษมั้ย ? </label>
            <select
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#123458] transition"
              value={spacial}
              onChange={(e) => setspacial(e.target.value)}
            >
              <option value="">เลือกพิเศษมั้ย</option>
              {portion_type.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
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

export default OrderForm