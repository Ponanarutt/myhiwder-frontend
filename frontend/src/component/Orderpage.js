"use client";
import React, { useState, useMemo } from "react";

const randomShop = () => {
  const shops = [
    "อร่อยเด็ด", "ข้าวแกงคุณยาย", "ก๋วยเตี๋ยวฮ่องเต้",
    "ข้าวหมูกรอบ", "อาหารตามสั่ง 24 ชม.", "ต้มยำรสจัด", "ครัวน้องมายด์"
  ];
  return shops[Math.floor(Math.random() * shops.length)];
};

const mainMenuOptions = [
  "ข้าวกะเพรา", "ก๋วยเตี๋ยวน้ำ", "ข้าวไข่เจียว", "ราดหน้า",
  "ผัดพริกแกง", "ข้าวหมูทอด", "สุกี้น้ำ", "ยำวุ้นเส้น"
];

const spiceLevels = ["ปกติ", "ไม่เผ็ด", "เผ็ดน้อย", "เผ็ดมาก"];

const addonGroups = {
  ประเภท: ["น้ำ", "แห้ง"],
  ข้าว: ["ข้าว", "ไม่เอาข้าว"],
  ไข่: ["ไข่ดาว", "ไข่เจียว"],
  เส้น: ["หมี่เหลือง", "หมี่ขาว", "เส้นเล็ก", "เส้นใหญ่"]
};

const autoSubmit = (data) => {
  console.log("✅ Auto-submit:", data);
};

const Orderpage = () => {
  const days = useMemo(() => {
    const weekdays = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"];
    return weekdays.map((day) => ({
      day,
      shops: [
        {
          shopName: randomShop(),
          menu: "",
          spiceLevel: "",
          isSpecial: false,
          noVeg: false,
          addons: { ประเภท: "", ข้าว: "", ไข่: "", เส้น: "" },
        },
        {
          shopName: randomShop(),
          menu: "",
          spiceLevel: "",
          isSpecial: false,
          noVeg: false,
          addons: { ประเภท: "", ข้าว: "", ไข่: "", เส้น: "" },
        },
      ],
    }));
  }, []);

  const [menuData, setMenuData] = useState(days);

  const handleChange = (dayIdx, shopIdx, field, value) => {
    const updated = [...menuData];
    updated[dayIdx].shops[shopIdx][field] = value;
    setMenuData(updated);
    autoSubmit(updated);
  };

  const handleAddonGroupChange = (dayIdx, shopIdx, group, value) => {
    const updated = [...menuData];
    updated[dayIdx].shops[shopIdx].addons[group] = value;
    setMenuData(updated);
    autoSubmit(updated);
  };

  return (
    <div className="w-full min-h-screen p-4 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border border-gray-300 rounded-md bg-white shadow">
          <thead className="bg-pink-100 text-gray-800 font-semibold">
            <tr>
              <th className="px-4 py-2 border">วัน</th>
              <th className="px-4 py-2 border">ร้าน</th>
              <th className="px-4 py-2 border">เมนู</th>
              <th className="px-4 py-2 border">ออฟชันเสริม</th>
              <th className="px-4 py-2 border">ระดับความเผ็ด</th>
              <th className="px-4 py-2 border">ไม่ใส่ผัก</th>
              <th className="px-4 py-2 border">พิเศษ</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((dayItem, dayIdx) =>
              dayItem.shops.map((shop, shopIdx) => (
                <tr key={`${dayIdx}-${shopIdx}`} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{shopIdx === 0 ? dayItem.day : ""}</td>
                  <td className="px-4 py-2 border">{shop.shopName}</td>

                  {/* เมนู */}
                  <td className="px-2 py-2 border">
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={shop.menu}
                      onChange={(e) => handleChange(dayIdx, shopIdx, "menu", e.target.value)}
                    >
                      <option value="">เลือกเมนู</option>
                      {mainMenuOptions.map((menu, i) => (
                        <option key={i} value={menu}>{menu}</option>
                      ))}
                    </select>
                  </td>

                  {/* ออฟชันเสริม */}
                  <td className="px-2 py-2 border">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(addonGroups).map(([group, options]) => (
                        <select
                          key={group}
                          className="w-full border rounded px-2 py-1"
                          value={shop.addons[group]}
                          onChange={(e) => handleAddonGroupChange(dayIdx, shopIdx, group, e.target.value)}
                        >
                          <option value="">{group}</option>
                          {options.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                          ))}
                        </select>
                      ))}
                    </div>
                  </td>

                  {/* ความเผ็ด */}
                  <td className="px-2 py-2 border">
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={shop.spiceLevel}
                      onChange={(e) => handleChange(dayIdx, shopIdx, "spiceLevel", e.target.value)}
                    >
                      <option value="">เลือก</option>
                      {spiceLevels.map((level, i) => (
                        <option key={i} value={level}>{level}</option>
                      ))}
                    </select>
                  </td>

                  {/* ไม่ใส่ผัก */}
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      className="accent-pink-500"
                      checked={shop.noVeg}
                      onChange={(e) => handleChange(dayIdx, shopIdx, "noVeg", e.target.checked)}
                    />
                  </td>

                  {/* พิเศษ */}
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      className="accent-pink-500"
                      checked={shop.isSpecial}
                      onChange={(e) => handleChange(dayIdx, shopIdx, "isSpecial", e.target.checked)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orderpage;
