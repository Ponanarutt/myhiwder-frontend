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
  // Only include weekdays (Monday-Friday)
  const days = useMemo(() => {
    const weekdays = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์"];
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

  // Custom color palette
  const colors = {
    background: "rgb(241, 239, 236)",
    secondary: "rgb(212, 201, 190)",
    primary: "rgb(18, 52, 88)",
    text: "rgb(3, 3, 3)",
    lightText: "rgb(241, 239, 236)",
    lightBackground: "rgb(255, 255, 255)",
    rowAlternate: "rgb(232, 228, 222)",
  };

  return (
    <div className="w-full min-h-screen p-6" style={{ backgroundColor: colors.background }}>
      <div className="max-w-full mx-auto">
        {/* Header Section - Made Larger with single line text */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>สั่งอาหารกลางวันประจำสัปดาห์</h1>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full mx-auto mb-4">
            <p className="text-lg inline-block" style={{ color: colors.text }}>
              วางแผนมื้อกลางวันของคุณล่วงหน้าตลอดทั้งสัปดาห์ เลือกร้านอาหาร เมนูโปรด และปรับแต่งตามที่คุณต้องการ
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-xl shadow-lg overflow-hidden border" 
             style={{ backgroundColor: colors.lightBackground, borderColor: colors.secondary }}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead style={{ backgroundColor: colors.primary, color: colors.lightText }}>
                <tr className="text-base">
                  <th className="px-6 py-4 text-left font-bold">วัน</th>
                  <th className="px-6 py-4 text-left font-bold">ร้าน</th>
                  <th className="px-6 py-4 text-left font-bold">เมนู</th>
                  <th className="px-6 py-4 text-left font-bold">ออฟชั่นเสริม</th>
                  <th className="px-6 py-4 text-left font-bold">ระดับความเผ็ด</th>
                  <th className="px-6 py-4 text-center font-bold">ไม่ใส่ผัก</th>
                  <th className="px-6 py-4 text-center font-bold">พิเศษ</th>
                </tr>
              </thead>
              <tbody style={{ color: colors.text }}>
                {menuData.map((dayItem, dayIdx) =>
                  dayItem.shops.map((shop, shopIdx) => {
                    // Alternate row colors by day (not by individual row)
                    const isAlternateDay = dayIdx % 2 === 1;
                    const rowBackground = isAlternateDay ? colors.rowAlternate : colors.lightBackground;
                    
                    return (
                      <tr 
                        key={`${dayIdx}-${shopIdx}`} 
                        className="transition-colors hover:bg-opacity-80"
                        style={{ backgroundColor: rowBackground }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {shopIdx === 0 ? (
                            <div className="flex items-center">
                              <span className="font-medium text-base" style={{ color: colors.primary }}>วัน{dayItem.day}</span>
                            </div>
                          ) : ""}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium">{shop.shopName}</span>
                        </td>

                        {/* เมนู */}
                        <td className="px-6 py-4">
                          <select
                            className="w-full rounded-md px-3 py-2 focus:outline-none text-base"
                            style={{ 
                              border: `1px solid ${colors.secondary}`,
                              color: colors.text,
                              backgroundColor: rowBackground
                            }}
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
                        <td className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(addonGroups).map(([group, options]) => (
                              <select
                                key={group}
                                className="w-full rounded-md px-3 py-2 focus:outline-none text-base"
                                style={{ 
                                  border: `1px solid ${colors.secondary}`,
                                  color: colors.text,
                                  backgroundColor: rowBackground
                                }}
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
                        <td className="px-6 py-4">
                          <select
                            className="w-full rounded-md px-3 py-2 focus:outline-none text-base"
                            style={{ 
                              border: `1px solid ${colors.secondary}`,
                              color: colors.text,
                              backgroundColor: rowBackground
                            }}
                            value={shop.spiceLevel}
                            onChange={(e) => handleChange(dayIdx, shopIdx, "spiceLevel", e.target.value)}
                          >
                            <option value="">เลือกระดับความเผ็ด</option>
                            {spiceLevels.map((level, i) => (
                              <option key={i} value={level}>{level}</option>
                            ))}
                          </select>
                        </td>

                        {/* ไม่ใส่ผัก */}
                        <td className="px-6 py-4 text-center">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded focus:ring-2"
                              style={{ 
                                accentColor: colors.primary,
                                borderColor: colors.secondary
                              }}
                              checked={shop.noVeg}
                              onChange={(e) => handleChange(dayIdx, shopIdx, "noVeg", e.target.checked)}
                            />
                          </label>
                        </td>

                        {/* พิเศษ */}
                        <td className="px-6 py-4 text-center">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded focus:ring-2"
                              style={{ 
                                accentColor: colors.primary,
                                borderColor: colors.secondary
                              }}
                              checked={shop.isSpecial}
                              onChange={(e) => handleChange(dayIdx, shopIdx, "isSpecial", e.target.checked)}
                            />
                          </label>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer Section */}
        <div className="mt-6 text-center" style={{ color: colors.text }}>
          <p>ระบบจะบันทึกข้อมูลอัตโนมัติทุกครั้งที่มีการเปลี่ยนแปลง</p>
          <p className="mt-1">© 2025 ระบบสั่งอาหารกลางวันประจำสัปดาห์</p>
        </div>
      </div>
    </div>
  );
};

export default Orderpage;
