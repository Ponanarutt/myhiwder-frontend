"use client";
import React, { useState, useMemo } from "react";

const randomShop = () => {
  const shops = [
    "อร่อยเด็ด", "ข้าวแกงคุณยาย", "ก๋วยเตี๋ยวฮ่องเต้",
    "ข้าวหมูกรอบ", "อาหารตามสั่ง 24 ชม.", "ต้มยำรสจัด", "ครัวน้องมายด์"
  ];
  return shops[Math.floor(Math.random() * shops.length)];
};

// เมนูหลักพร้อมประเภทเนื้อสัตว์
const mainMenuCategories = {
  "กะเพรา": ["หมูสับ", "หมูกรอบ", "ไก่", "เนื้อ", "กุ้ง", "ปลาหมึก", "ทะเล", "เจ"],
  "ผัดพริกแกง": ["หมู", "ไก่", "เนื้อ", "กุ้ง", "ปลาหมึก", "ทะเล"],
  "ข้าวผัด": ["หมู", "ไก่", "กุ้ง", "ปู", "ทะเล", "อเมริกัน", "ธรรมดา"],
  "ก๋วยเตี๋ยว": ["หมู", "ไก่", "เนื้อ", "เย็นตาโฟ", "ต้มยำ", "เกาเหลา"],
  "สุกี้": ["หมู", "ไก่", "ทะเล", "รวมมิตร"],
  "ผัดซีอิ๊ว": ["หมู", "ไก่", "กุ้ง"],
  "ราดหน้า": ["หมู", "ไก่", "ทะเล", "เจ"],
  "ข้าวหน้า": ["หมูทอด", "ไก่ทอด", "หมูแดง", "เป็ดย่าง"],
  "ยำ": ["วุ้นเส้น", "มาม่า", "ปลาหมึก", "ทะเล", "รวมมิตร"]
};

// สร้างรายการเมนูทั้งหมด
const allMenuOptions = [];
Object.entries(mainMenuCategories).forEach(([menuName, meatTypes]) => {
  meatTypes.forEach(meatType => {
    allMenuOptions.push(`${menuName}${meatType}`);
  });
});

// ออฟชั่นเสริมตามประเภทเมนู
const menuAddons = {
  "กะเพรา": ["ไข่"],
  "ผัดพริกแกง": ["ไข่"],
  "ข้าวผัด": ["ไข่"],
  "ก๋วยเตี๋ยว": ["เส้น", "น้ำซุป"],
  "สุกี้": ["น้ำ/แห้ง"],
  "ผัดซีอิ๊ว": ["เส้น"],
  "ราดหน้า": ["เส้น"],
  "ข้าวหน้า": ["ข้าว"],
  "ยำ": ["ข้าว"]
};

const addonOptions = {
  "ไข่": ["ไข่ดาว", "ไข่เจียว", "ไม่ใส่ไข่"],
  "เส้น": ["เส้นเล็ก", "เส้นใหญ่", "บะหมี่", "หมี่ขาว", "หมี่เหลือง", "วุ้นเส้น"],
  "น้ำซุป": ["ต้มยำ", "น้ำใส", "น้ำตก", "เย็นตาโฟ"],
  "น้ำ/แห้ง": ["น้ำ", "แห้ง"],
  "ข้าว": ["ข้าวหอมมะลิ", "ข้าวไรซ์เบอร์รี่", "ไม่เอาข้าว"]
};

const spiceLevels = ["ไม่เผ็ด", "เผ็ดน้อย", "ปกติ", "เผ็ดมาก", "เผ็ดสุดๆ"];

const autoSubmit = (data) => {
  console.log("✅ Auto-submit:", data);
};

// ฟังก์ชั่นสำหรับหาประเภทเมนูหลักจากชื่อเมนูเต็ม
const getMenuCategory = (fullMenuName) => {
  for (const [category, meatTypes] of Object.entries(mainMenuCategories)) {
    if (meatTypes.some(meat => fullMenuName.includes(category + meat))) {
      return category;
    }
  }
  return null;
};

// ฟังก์ชั่นสำหรับหาออฟชั่นเสริมที่เกี่ยวข้องกับเมนู
const getRelevantAddons = (menuName) => {
  const category = getMenuCategory(menuName);
  if (!category || !menuAddons[category]) return [];
  return menuAddons[category];
};

const Orderpage = () => {
  // Only include weekdays (Monday-Friday)
  const days = useMemo(() => {
    const weekdays = [
      { name: "วันจันทร์", shops: 2 },
      { name: "วันอังคาร", shops: 2 },
      { name: "วันพุธ", shops: 2 },
      { name: "วันพฤหัส", shops: 2 },
      { name: "วันศุกร์", shops: 2 }
    ];
    
    return weekdays.map((day) => ({
      day: day.name,
      shops: Array(day.shops).fill().map(() => ({
        shopName: randomShop(),
        menu: "",
        spiceLevel: "",
        isSpecial: false,
        noVeg: false,
        addons: {}
      }))
    }));
  }, []);

  const [menuData, setMenuData] = useState(days);

  const handleChange = (dayIdx, shopIdx, field, value) => {
    const updated = [...menuData];
    
    // ถ้าเปลี่ยนเมนู ให้รีเซ็ตออฟชั่นเสริมทั้งหมด
    if (field === "menu") {
      updated[dayIdx].shops[shopIdx].addons = {};
    }
    
    updated[dayIdx].shops[shopIdx][field] = value;
    setMenuData(updated);
    autoSubmit(updated);
  };

  const handleAddonChange = (dayIdx, shopIdx, addonType, value) => {
    const updated = [...menuData];
    if (!updated[dayIdx].shops[shopIdx].addons) {
      updated[dayIdx].shops[shopIdx].addons = {};
    }
    updated[dayIdx].shops[shopIdx].addons[addonType] = value;
    setMenuData(updated);
    autoSubmit(updated);
  };

  // Custom color palette based on the image
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

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-full">
        {/* Header Section */}
        <div className="mb-6 text-center pt-6 px-4">
          <h1 className="text-3xl font-bold" style={{ color: colors.headerBackground }}>สั่งอาหารกลางวันประจำสัปดาห์</h1>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden border rounded-sm" style={{ borderColor: colors.border }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead style={{ backgroundColor: colors.headerBackground, color: colors.headerText }}>
                <tr>
                  <th className="px-4 py-3 text-left font-medium border-b" style={{ borderColor: colors.borderRow, width: "12%" }}>วัน</th>
                  <th className="px-4 py-3 text-left font-medium border-b" style={{ borderColor: colors.borderRow, width: "18%" }}>ร้าน</th>
                  <th className="px-4 py-3 text-left font-medium border-b" style={{ borderColor: colors.borderRow, width: "20%" }}>เมนู</th>
                  <th className="px-4 py-3 text-left font-medium border-b" style={{ borderColor: colors.borderRow, width: "25%" }}>ออฟชั่นเสริม</th>
                  <th className="px-4 py-3 text-left font-medium border-b" style={{ borderColor: colors.borderRow, width: "15%" }}>ระดับความเผ็ด</th>
                  <th className="px-4 py-3 text-center font-medium border-b" style={{ borderColor: colors.borderRow, width: "5%" }}>ไม่ใส่ผัก</th>
                  <th className="px-4 py-3 text-center font-medium border-b" style={{ borderColor: colors.borderRow, width: "5%" }}>พิเศษ</th>
                </tr>
              </thead>
              <tbody>
                {menuData.map((dayItem, dayIdx) => {
                  const isLastDayRow = dayIdx === menuData.length - 1;
                  
                  return dayItem.shops.map((shop, shopIdx) => {
                    // หาประเภทเมนูและออฟชั่นเสริมที่เกี่ยวข้อง
                    const relevantAddons = getRelevantAddons(shop.menu);
                    const isOddDay = dayIdx % 2 === 0;
                    const rowBgColor = isOddDay ? colors.rowEven : colors.rowOdd;
                    const isLastShopInDay = shopIdx === dayItem.shops.length - 1;
                    
                    // กำหนดเส้นขอบด้านล่างสำหรับแถวสุดท้ายของแต่ละวัน
                    const borderBottomStyle = isLastShopInDay && !isLastDayRow 
                      ? { borderBottom: `2px solid ${colors.borderRow}` }
                      : { borderBottom: `1px solid ${colors.borderRow}` };
                    
                    return (
                      <tr 
                        key={`${dayIdx}-${shopIdx}`} 
                        style={{ backgroundColor: rowBgColor, ...borderBottomStyle }}
                      >
                        <td className="px-4 py-3 border-r" style={{ borderColor: colors.borderRow }}>
                          {shopIdx === 0 ? (
                            <div className="font-medium">{dayItem.day}</div>
                          ) : ""}
                        </td>
                        <td className="px-4 py-3 border-r" style={{ borderColor: colors.borderRow }}>
                          <span>{shop.shopName}</span>
                        </td>

                        {/* เมนู */}
                        <td className="px-4 py-3 border-r" style={{ borderColor: colors.borderRow }}>
                          <div className="relative">
                            <select
                              className="w-full px-3 py-2 border rounded cursor-pointer appearance-none pr-8"
                              style={{ 
                                backgroundColor: colors.selectBg,
                                borderColor: colors.border,
                                color: colors.text
                              }}
                              value={shop.menu}
                              onChange={(e) => handleChange(dayIdx, shopIdx, "menu", e.target.value)}
                            >
                              <option value="">เลือกเมนู</option>
                              {Object.entries(mainMenuCategories).map(([category, meatTypes]) => (
                                <optgroup key={category} label={category}>
                                  {meatTypes.map((meat, i) => (
                                    <option key={`${category}-${i}`} value={`${category}${meat}`}>
                                      {category}{meat}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                          </div>
                        </td>

                        {/* ออฟชันเสริม - แสดงเฉพาะออฟชั่นที่เกี่ยวข้องกับเมนูที่เลือก */}
                        <td className="px-4 py-3 border-r" style={{ borderColor: colors.borderRow }}>
                          {shop.menu ? (
                            relevantAddons.length > 0 ? (
                              <div className="grid grid-cols-2 gap-2">
                                {relevantAddons.map((addonType) => (
                                  <div key={addonType} className="flex flex-col">
                                    {/* <div className="text-sm mb-1">{addonType}</div>  */}
                                    <div className="relative">
                                      <select
                                        className="w-full px-3 py-1 border rounded cursor-pointer appearance-none pr-8"
                                        style={{ 
                                          backgroundColor: colors.selectBg,
                                          borderColor: colors.border,
                                          color: colors.text
                                        }}
                                        value={shop.addons[addonType] || ""}
                                        onChange={(e) => handleAddonChange(dayIdx, shopIdx, addonType, e.target.value)}
                                      >
                                        <option value="">เลือก{addonType}</option>
                                        {addonOptions[addonType].map((option, i) => (
                                          <option key={i} value={option}>{option}</option>
                                        ))}
                                      </select>
                                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">ไม่มีออฟชั่นเสริม</div>
                            )
                          ) : (
                            <div className="text-sm text-gray-500">กรุณาเลือกเมนูก่อน</div>
                          )}
                        </td>

                        {/* ความเผ็ด */}
                        <td className="px-4 py-3 border-r" style={{ borderColor: colors.borderRow }}>
                          <div className="relative">
                            <select
                              className="w-full px-3 py-2 border rounded cursor-pointer appearance-none pr-8"
                              style={{ 
                                backgroundColor: colors.selectBg,
                                borderColor: colors.border,
                                color: colors.text
                              }}
                              value={shop.spiceLevel}
                              onChange={(e) => handleChange(dayIdx, shopIdx, "spiceLevel", e.target.value)}
                            >
                              <option value="">เลือกระดับความเผ็ด</option>
                              {spiceLevels.map((level, i) => (
                                <option key={i} value={level}>{level}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                          </div>
                        </td>

                        {/* ไม่ใส่ผัก */}
                        <td className="px-4 py-3 text-center border-r" style={{ borderColor: colors.borderRow }}>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded cursor-pointer"
                              checked={shop.noVeg}
                              onChange={(e) => handleChange(dayIdx, shopIdx, "noVeg", e.target.checked)}
                            />
                          </label>
                        </td>

                        {/* พิเศษ */}
                        <td className="px-4 py-3 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded cursor-pointer"
                              checked={shop.isSpecial}
                              onChange={(e) => handleChange(dayIdx, shopIdx, "isSpecial", e.target.checked)}
                            />
                          </label>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer Section */}
        <div className="mt-6 text-center pb-6" style={{ color: colors.text }}>
          <p>ระบบจะบันทึกข้อมูลอัตโนมัติทุกครั้งที่มีการเปลี่ยนแปลง</p>
          <p className="mt-1">© 2025 ระบบสั่งอาหารกลางวันประจำสัปดาห์</p>
        </div>
      </div>
    </div>
  );
};

export default Orderpage;
