import React, { useState } from "react";

// กำหนด Theme colors
const colors = {
  bgLight: "rgb(241, 239, 236)",
  accent: "rgb(212, 201, 190)",
  primary: "rgb(18, 52, 88)",
  text: "rgb(3, 3, 3)"
};

// เพิ่มโครงสร้างข้อมูล add-ons
const initialShops = [
  {
    id: 1,
    name: "ร้านข้าวมันไก่เจ๊น้อย",
    menus: [
      { 
        id: 1,
        name: "ข้าวมันไก่ต้ม", 
        price: 40,
        addons: [
          { name: "ไข่ต้ม", price: 10 },
          { name: "พิเศษ", price: 15 }
        ]
      },
      { 
        id: 2,
        name: "ข้าวมันไก่ทอด", 
        price: 45,
        addons: [
          { name: "ไข่ดาว", price: 10 }
        ]
      },
    ],
  },
  {
    id: 2,
    name: "ร้านไก่ย่างเขาสวนกวาง",
    menus: [
      { 
        id: 1,
        name: "ไก่ย่างสมุนไพร", 
        price: 55,
        addons: [] 
      },
      { 
        id: 2,
        name: "ข้าวเหนียว", 
        price: 10,
        addons: [] 
      },
    ],
  },
  {
    id: 3,
    name: "ร้านข้าวหมูแดงนายฮุย",
    menus: [
      { 
        id: 1,
        name: "ข้าวหมูแดง", 
        price: 45,
        addons: [
          { name: "ไข่ดาว", price: 10 },
          { name: "พิเศษ", price: 15 }
        ] 
      },
      { 
        id: 2,
        name: "ข้าวหมูกรอบ", 
        price: 50,
        addons: [
          { name: "ไข่ดาว", price: 10 }
        ] 
      },
    ],
  },
  {
    id: 4,
    name: "ก๋วยเตี๋ยวเรืออยุธยา",
    menus: [
      { 
        id: 1,
        name: "ก๋วยเตี๋ยวหมูน้ำตก", 
        price: 35,
        addons: [
          { name: "เส้นเล็ก", price: 0 },
          { name: "เส้นใหญ่", price: 0 }
        ] 
      },
      { 
        id: 2,
        name: "เกาเหลารวม", 
        price: 45,
        addons: [] 
      },
    ],
  },
  {
    id: 5,
    name: "ข้าวแกงป้าน้อย",
    menus: [
      { id: 1, name: "ไข่พะโล้", price: 25, addons: [] },
      { id: 2, name: "ผัดเผ็ดหมู", price: 30, addons: [] },
      { id: 3, name: "แกงเขียวหวานไก่", price: 35, addons: [] },
    ],
  },
  {
    id: 6,
    name: "เจ๊แดงซีฟู้ด",
    menus: [
      { id: 1, name: "ข้าวผัดปู", price: 70, addons: [] },
      { id: 2, name: "ต้มยำกุ้ง", price: 90, addons: [] },
    ],
  },
  {
    id: 7,
    name: "ร้านกะเพราถาดพี่ใหญ่",
    menus: [
      { id: 1, name: "กะเพราหมูสับถาด", price: 50, addons: [] },
      { id: 2, name: "กะเพราทะเลถาด", price: 65, addons: [] },
    ],
  },
  {
    id: 8,
    name: "ส้มตำป้าติ๋ม",
    menus: [
      { id: 1, name: "ตำไทย", price: 30, addons: [] },
      { id: 2, name: "ตำปูปลาร้า", price: 35, addons: [] },
      { id: 3, name: "ไก่ทอด", price: 40, addons: [] },
    ],
  },
  {
    id: 9,
    name: "หมูกรอบเจ๊หน่อย",
    menus: [
      { id: 1, name: "ข้าวหมูกรอบราดน้ำ", price: 45, addons: [] },
      { id: 2, name: "หมูกรอบล้วน", price: 55, addons: [] },
    ],
  },
  {
    id: 10,
    name: "ข้าวต้มโต้รุ่ง",
    menus: [
      { id: 1, name: "ข้าวต้มหมู", price: 35, addons: [] },
      { id: 2, name: "ยำไข่เค็ม", price: 40, addons: [] },
      { id: 3, name: "ต้มจืดเต้าหู้หมูสับ", price: 45, addons: [] },
    ],
  },
];

// Component สำหรับแสดงรายการร้านค้า
const ShopItem = ({ shop, onEdit, isActive }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white p-5 rounded-lg border ${isActive ? `border-[${colors.primary}] ring-2 ring-[${colors.primary}]/20` : 'border-gray-200'} shadow hover:shadow-md transition`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{shop.name}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(shop)} 
            className="p-1 hover:bg-gray-100 rounded"
            title="แก้ไขร้านค้า"
            style={{ color: colors.primary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="p-1 hover:bg-gray-100 rounded"
            title={expanded ? "ซ่อนรายการ" : "แสดงรายการ"}
            style={{ color: colors.primary }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transform ${expanded ? 'rotate-180' : ''} transition-transform`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <h4 className="font-medium text-sm text-gray-700 mb-2">รายการอาหาร:</h4>
          <ul className="text-sm space-y-2" style={{ color: colors.text }}>
            {shop.menus.map((item) => (
              <li key={item.id} className="pl-2">
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-gray-500">{item.price} บาท</span>
                </div>
                
                {item.addons && item.addons.length > 0 && (
                  <ul className="ml-4 mt-1 text-xs text-gray-500">
                    {item.addons.map((addon, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>+ {addon.name}</span>
                        <span>{addon.price > 0 ? `${addon.price} บาท` : 'ฟรี'}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CreatePage = () => {
  // สถานะสำหรับร้านค้า
  const [shops, setShops] = useState(initialShops);
  
  // สถานะสำหรับฟอร์ม
  const [isEditing, setIsEditing] = useState(false);
  const [activeShopId, setActiveShopId] = useState(null);
  const [shopName, setShopName] = useState("");
  const [menuItems, setMenuItems] = useState([{ id: Date.now(), name: "", price: "", addons: [] }]);
  
  // ฟังก์ชันสำหรับเริ่มการแก้ไขร้านค้า
  const handleEditShop = (shop) => {
    setIsEditing(true);
    setActiveShopId(shop.id);
    setShopName(shop.name);
    
    // คัดลอกเมนูและ addons เพื่อไม่ให้เกิดการอ้างอิงโดยตรง
    const menusCopy = shop.menus.map(menu => ({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      addons: [...(menu.addons || [])]
    }));
    
    setMenuItems(menusCopy);
  };
  
  // ฟังก์ชันสำหรับยกเลิกการแก้ไข
  const handleCancelEdit = () => {
    setIsEditing(false);
    setActiveShopId(null);
    setShopName("");
    setMenuItems([{ id: Date.now(), name: "", price: "", addons: [] }]);
  };
  
  // ฟังก์ชันจัดการการเปลี่ยนแปลงของเมนู
  const handleMenuChange = (index, field, value) => {
    const updated = [...menuItems];
    updated[index][field] = value;
    setMenuItems(updated);
  };
  
  // ฟังก์ชันเพิ่มรายการเมนู
  const addMenuItem = () => {
    setMenuItems([...menuItems, { id: Date.now(), name: "", price: "", addons: [] }]);
  };
  
  // ฟังก์ชันลบรายการเมนู
  const removeMenuItem = (index) => {
    if (menuItems.length > 1) {
      const updated = [...menuItems];
      updated.splice(index, 1);
      setMenuItems(updated);
    }
  };
  
  // ฟังก์ชันจัดการ add-ons
  const handleAddonChange = (menuIndex, addonIndex, field, value) => {
    const updatedMenus = [...menuItems];
    updatedMenus[menuIndex].addons[addonIndex][field] = value;
    setMenuItems(updatedMenus);
  };
  
  // ฟังก์ชันเพิ่ม add-on
  const addAddon = (menuIndex) => {
    const updatedMenus = [...menuItems];
    if (!updatedMenus[menuIndex].addons) {
      updatedMenus[menuIndex].addons = [];
    }
    updatedMenus[menuIndex].addons.push({ name: "", price: "" });
    setMenuItems(updatedMenus);
  };
  
  // ฟังก์ชันลบ add-on
  const removeAddon = (menuIndex, addonIndex) => {
    const updatedMenus = [...menuItems];
    updatedMenus[menuIndex].addons.splice(addonIndex, 1);
    setMenuItems(updatedMenus);
  };
  
  // ฟังก์ชันบันทึกข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // อัปเดตร้านค้าที่มีอยู่
      const updatedShops = shops.map(shop => 
        shop.id === activeShopId 
          ? { ...shop, name: shopName, menus: menuItems } 
          : shop
      );
      setShops(updatedShops);
    } else {
      // สร้างร้านค้าใหม่
      const newId = Math.max(...shops.map(shop => shop.id), 0) + 1;
      const newShop = { 
        id: newId, 
        name: shopName, 
        menus: menuItems 
      };
      setShops([...shops, newShop]);
    }
    
    // รีเซ็ตฟอร์ม
    handleCancelEdit();
  };

  return (
    <div className="h-screen w-full p-6 overflow-y-auto" style={{ backgroundColor: colors.bgLight }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* ซ้าย: ร้านอาหาร */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>ร้านอาหารทั้งหมด ({shops.length})</h2>
          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            {shops.length === 0 ? (
              <div className="p-4 bg-white rounded shadow text-gray-400 italic">
                ยังไม่มีร้านอาหาร
              </div>
            ) : (
              shops.map((shop) => (
                <ShopItem 
                  key={shop.id} 
                  shop={shop} 
                  onEdit={handleEditShop}
                  isActive={activeShopId === shop.id}
                />
              ))
            )}
          </div>
        </div>

        {/* ขวา: ฟอร์มสร้าง/แก้ไขร้าน */}
        <div className="lg:w-1/2 w-full bg-white p-8 rounded-xl shadow space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
              {isEditing ? "แก้ไขร้านอาหาร" : "สร้างร้านอาหาร"}
            </h2>
            {isEditing && (
              <button 
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input ร้าน */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>ชื่อร้าน</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2"
                style={{ borderColor: "rgb(229, 231, 235)", focusRingColor: colors.primary }}
                placeholder="เช่น ร้านข้าวหมูแดงนายฮุย"
                required
              />
            </div>

            {/* Input เมนู */}
            <div className="space-y-4">
              <label className="block text-sm font-medium" style={{ color: colors.text }}>รายการเมนู</label>
              
              {menuItems.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg bg-gray-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium" style={{ color: colors.text }}>เมนูที่ {index + 1}</h4>
                    {menuItems.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeMenuItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ชื่อเมนู"
                      value={item.name}
                      onChange={(e) => handleMenuChange(index, "name", e.target.value)}
                      className="w-2/3 border rounded px-3 py-2"
                      required
                    />
                    <input
                      type="number"
                      placeholder="ราคา"
                      value={item.price}
                      onChange={(e) => handleMenuChange(index, "price", e.target.value)}
                      className="w-1/3 border rounded px-3 py-2"
                      required
                    />
                  </div>
                  
                  {/* Add-ons */}
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-gray-600">ออฟชั่นเสริม (Add-ons)</label>
                      <button
                        type="button"
                        onClick={() => addAddon(index)}
                        className="text-xs flex items-center"
                        style={{ color: colors.primary }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        เพิ่มออฟชั่น
                      </button>
                    </div>
                    
                    {item.addons && item.addons.length > 0 ? (
                      <div className="space-y-2 pl-2">
                        {item.addons.map((addon, addonIndex) => (
                          <div key={addonIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="ชื่อออฟชั่น"
                              value={addon.name}
                              onChange={(e) => handleAddonChange(index, addonIndex, "name", e.target.value)}
                              className="flex-1 border rounded px-3 py-1 text-sm"
                              required
                            />
                            <input
                              type="number"
                              placeholder="ราคา"
                              value={addon.price}
                              onChange={(e) => handleAddonChange(index, addonIndex, "price", e.target.value)}
                              className="w-20 border rounded px-3 py-1 text-sm"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeAddon(index, addonIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">ยังไม่มีออฟชั่นเสริม</p>
                    )}
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addMenuItem}
                className="flex items-center text-sm hover:underline"
                style={{ color: colors.primary }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                เพิ่มเมนูใหม่
              </button>
            </div>

            {/* ปุ่มบันทึก */}
            <div>
              <button
                type="submit"
                className="text-white px-6 py-2 rounded font-semibold"
                style={{ 
                  backgroundColor: isEditing ? colors.primary : colors.primary,
                  opacity: isEditing ? 1 : 0.9,
                }}
              >
                {isEditing ? 'บันทึกการแก้ไข' : 'บันทึกร้านอาหาร'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
