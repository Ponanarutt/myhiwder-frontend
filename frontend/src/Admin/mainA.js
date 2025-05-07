import React from 'react'

const MainA = () => {
  return (
    <div className="flex flex-col h-screen lg:flex-row gap-6 mt-6">
    {/* ซ้าย: เลือกเมนู */}
    <div className="lg:w-2/3 w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-center text-white bg-blue-600 py-3 text-lg font-semibold">
        ร้านไก่ทอดผู้พันร์
      </h2>
      <div className="p-6 space-y-6">
        {/* เมนู 1 */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">เมนูรายบุคคล</label>
          <select className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>ข้าวมันไก่ทอด พิเศษ - 11</option>
            <option>ข้าวมันไก่ทอด ธรรมดา - 9</option>
          </select>
          <div className="flex flex-wrap gap-2">
            {Array(4).fill(0).map((_, i) => (
              <button
                key={i}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded px-4 py-1 transition"
              >
                แถม
              </button>
            ))}
          </div>
        </div>

        {/* เมนู 2 */}
        <div>
          <select className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>ข้าวมันไก่ต้ม ไม่พิเศษ - 12</option>
            <option>ข้าวมันไก่ต้ม ธรรมดา - 9</option>
          </select>
          <div className="flex flex-wrap gap-2">
            {Array(4).fill(0).map((_, i) => (
              <button
                key={i}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded px-4 py-1 transition"
              >
                แถม
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* ขวา: สรุป */}
    <div className="lg:w-1/3 w-full border rounded-xl bg-white shadow-lg overflow-hidden">
      <div className="bg-gray-100 px-5 py-3 font-bold text-gray-700 border-b text-center">
        สรุปรายการสั่งอาหาร
      </div>
      <div className="p-5 text-sm space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>วันที่</span>
          <span>5 พ.ค. 68</span>
        </div>
        <hr />
        <div className="space-y-1">
          <div className="flex justify-between font-medium text-gray-700">
            <span>เมนู</span>
            <span>ปริมาณ</span>
          </div>
          <div className="flex justify-between">
            <span>ข้าวมันไก่ทอด พิเศษ</span>
            <span>1</span>
          </div>
          <div className="flex justify-between">
            <span>ข้าวมันไก่ทอด ธรรมดา</span>
            <span>9</span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-blue-700 text-base">
          <span>รวม</span>
          <span>10</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MainA