import React, {useState} from 'react'

const MainA = ( {initialShops} ) => {
  const [shops, setShops] = useState(initialShops);
  const [expandedShops, setExpandedShops] = useState({ 1: true });
  const [currentDate, setCurrentDate] = useState("5 พ.ค. 68");

  // Toggle การแสดงรายละเอียดของร้าน
  const toggleShopExpand = (shopId) => {
    setExpandedShops(prev => ({
      ...prev,
      [shopId]: !prev[shopId]
    }));
  };

  // เลือกร้านค้า
  const toggleShopSelection = (shopId) => {
    setShops(shops.map(shop => 
      shop.id === shopId 
        ? { ...shop, selected: true } 
        : { ...shop, selected: false }
    ));
  };

  // คำนวณสรุปรายการอาหารจากร้านที่เลือก
  const getSelectedShopSummary = () => {
    const selectedShop = shops.find(shop => shop.selected);
    return selectedShop || null;
  };

  // สรุปรายการอาหารทั้งหมด
  const selectedShopSummary = getSelectedShopSummary();

  // Theme colors
  const colors = {
    bgLight: "rgb(241, 239, 236)",
    accent: "rgb(212, 201, 190)",
    primary: "rgb(18, 52, 88)",
    text: "rgb(3, 3, 3)"
  };

  return (
    <div className="mt-6 flex flex-col lg:flex-row gap-6">
      {/* ด้านซ้าย: รายการร้านค้า */}
      <div className="lg:w-3/5 w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-4 font-semibold text-white text-xl" 
            style={{ backgroundColor: colors.primary }}
          >
            รายการร้านค้า
          </div>
          
          <div className="divide-y">
            {shops.map((shop) => (
              <div key={shop.id} className="p-5 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={shop.selected}
                      onChange={() => toggleShopSelection(shop.id)}
                      className="w-6 h-6 rounded cursor-pointer accent-[rgb(18,52,88)]"
                    />
                    <h3 className="text-xl font-medium" style={{ color: colors.text }}>
                      {shop.name}
                    </h3>
                  </div>
                  
                  <button 
                    onClick={() => toggleShopExpand(shop.id)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-6 w-6 transform transition-transform ${expandedShops[shop.id] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke={colors.primary}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {/* รายละเอียดเมนูของร้าน */}
                {expandedShops[shop.id] && (
                  <div className="mt-5 pl-10 space-y-5">
                    {shop.menus.map((menu) => (
                      <div key={menu.id} className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                        <div className="mb-3">
                          <span className="font-medium text-lg">{menu.name}</span>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {menu.orderedBy.map((person, idx) => (
                              <span 
                                key={idx} 
                                className="px-3 py-2 text-base rounded-full" 
                                style={{ backgroundColor: colors.accent }}
                              >
                                {person}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ด้านขวา: สรุปรายการคำสั่ง */}
      <div className="lg:w-2/5 w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-4 font-semibold text-white text-xl" 
            style={{ backgroundColor: colors.primary }}
          >
            สรุปรายการสั่งอาหาร
          </div>
          
          <div className="p-5 bg-white">
            <div className="flex justify-between items-center mb-5">
              <span className="font-medium text-lg">วันที่</span>
              <span className="text-lg">{currentDate}</span>
            </div>
            
            {selectedShopSummary ? (
              <>
                <div className="mb-5">
                  <h3 className="font-semibold text-xl mb-3">{selectedShopSummary.name}</h3>
                  <div className="space-y-3">
                    {selectedShopSummary.menus.map((menu) => (
                      <div 
                        key={menu.id} 
                        className="flex justify-between items-center p-4 rounded-lg bg-white border border-gray-100 shadow-sm"
                      >
                        <span className="text-lg">{menu.name}</span>
                        <span className="font-medium text-xl">{menu.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xl">รวม</span>
                    <span className="font-semibold text-xl">
                      {selectedShopSummary.menus.reduce((sum, menu) => sum + menu.count, 0)} รายการ
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center text-gray-500 text-lg">
                กรุณาเลือกร้านค้าเพื่อดูสรุปรายการ
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainA