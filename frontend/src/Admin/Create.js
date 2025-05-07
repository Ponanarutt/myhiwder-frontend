import React, { useState } from "react";

const initialShops = [
  {
    name: "ร้านข้าวมันไก่เจ๊น้อย",
    menus: [
      { name: "ข้าวมันไก่ต้ม", price: 40 },
      { name: "ข้าวมันไก่ทอด", price: 45 },
    ],
  },
  {
    name: "ร้านไก่ย่างเขาสวนกวาง",
    menus: [
      { name: "ไก่ย่างสมุนไพร", price: 55 },
      { name: "ข้าวเหนียว", price: 10 },
    ],
  },
  {
    name: "ร้านข้าวหมูแดงนายฮุย",
    menus: [
      { name: "ข้าวหมูแดง", price: 45 },
      { name: "ข้าวหมูกรอบ", price: 50 },
    ],
  },
  {
    name: "ก๋วยเตี๋ยวเรืออยุธยา",
    menus: [
      { name: "ก๋วยเตี๋ยวหมูน้ำตก", price: 35 },
      { name: "เกาเหลารวม", price: 45 },
    ],
  },
  {
    name: "ข้าวแกงป้าน้อย",
    menus: [
      { name: "ไข่พะโล้", price: 25 },
      { name: "ผัดเผ็ดหมู", price: 30 },
      { name: "แกงเขียวหวานไก่", price: 35 },
    ],
  },
  {
    name: "เจ๊แดงซีฟู้ด",
    menus: [
      { name: "ข้าวผัดปู", price: 70 },
      { name: "ต้มยำกุ้ง", price: 90 },
    ],
  },
  {
    name: "ร้านกะเพราถาดพี่ใหญ่",
    menus: [
      { name: "กะเพราหมูสับถาด", price: 50 },
      { name: "กะเพราทะเลถาด", price: 65 },
    ],
  },
  {
    name: "ส้มตำป้าติ๋ม",
    menus: [
      { name: "ตำไทย", price: 30 },
      { name: "ตำปูปลาร้า", price: 35 },
      { name: "ไก่ทอด", price: 40 },
    ],
  },
  {
    name: "หมูกรอบเจ๊หน่อย",
    menus: [
      { name: "ข้าวหมูกรอบราดน้ำ", price: 45 },
      { name: "หมูกรอบล้วน", price: 55 },
    ],
  },
  {
    name: "ข้าวต้มโต้รุ่ง",
    menus: [
      { name: "ข้าวต้มหมู", price: 35 },
      { name: "ยำไข่เค็ม", price: 40 },
      { name: "ต้มจืดเต้าหู้หมูสับ", price: 45 },
    ],
  },
];

const CreatePage = () => {
  const [shopName, setShopName] = useState("");
  const [menuItems, setMenuItems] = useState([{ name: "", price: "" }]);
  const [shops, setShops] = useState(initialShops);

  const handleMenuChange = (index, field, value) => {
    const updated = [...menuItems];
    updated[index][field] = value;
    setMenuItems(updated);
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: "", price: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShop = { name: shopName, menus: menuItems };
    setShops([...shops, newShop]);
    setShopName("");
    setMenuItems([{ name: "", price: "" }]);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-white to-gray-100 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* ซ้าย: ร้านอาหาร */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ร้านอาหารทั้งหมด</h2>
          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            {shops.length === 0 ? (
              <div className="p-4 bg-white rounded shadow text-gray-400 italic">
                ยังไม่มีร้านอาหาร
              </div>
            ) : (
              shops.map((shop, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg border border-gray-200 shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{shop.name}</h3>
                  <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                    {shop.menus.map((item, i) => (
                      <li key={i}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ขวา: ฟอร์มสร้างร้าน */}
        <div className="lg:w-1/2 w-full bg-white p-8 rounded-xl shadow space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">สร้างร้านอาหาร</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input ร้าน */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อร้าน</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น ร้านข้าวหมูแดงนายฮุย"
                required
              />
            </div>

            {/* Input เมนู */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">รายการเมนู</label>
              {menuItems.map((item, index) => (
                <div key={index} className="flex gap-2">
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
              ))}
              <button
                type="button"
                onClick={addMenuItem}
                className="text-blue-600 hover:underline text-sm"
              >
                + เพิ่มเมนู
              </button>
            </div>

            {/* ปุ่มบันทึก */}
            <div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
              >
                บันทึกร้านอาหาร
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
