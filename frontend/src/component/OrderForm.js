"use client";
import React, { useState } from "react";

const CardSlider = () => {
  const [showFirstSet, setShowFirstSet] = useState(false); // false = show 2 & 3
  const [OpenDetail, setOpenDetail] = useState(false);
  const [meat, setMeat] = useState("");
  const [specials, setSpecials] = useState([]);
  const [spice, setSpice] = useState("");
  const [noVeggie, setNoVeggie] = useState(false);
  const [egg, setEgg] = useState("");

  const handleSubmit = () => {
    if(spice == "" | meat == ""){
      console.log("ข้อมูลไม่ครบ")
      return
    }

    const data = {
      meat,
      specials,
      spice,
      noVeggie,
      egg,
    };

    console.log("✅ Selected Data:", data);
    setEgg("")
    setMeat("")
    setNoVeggie(false)
    setSpecials([])
    setSpice("")
    setOpenDetail(false)
  };

  const handleSpecialChange = (e) => {
    const value = e.target.value;
    setSpecials((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="h-[calc(100vh-67px)] w-full bg-transparent p-6 font-sans gap-10 text-black rounded-b-2xl  overflow-hidden ">
      <div
        className={`flex w-[150%] h-full transition-transform duration-700 ease-in-out`}
        style={{
          transform: showFirstSet ? "translateX(0%)" : "translateX(-33.3333%)",
        }}
      >
        {/* Card 1 */}
        <div className="w-1/2 p-4">
          <div
            className={`h-full rounded-xl shadow flex flex-col font-bold text-xl transition-all duration-700 ${
              showFirstSet ? "bg-white opacity-100" : "bg-transparent "
            }`}
          >
            {/* title */}
            <h1 className="text-4xl px-2 py-2">KFC - เเหลมทองพลาซ่า บางเเสน</h1>
            {/* menu select */}
            {OpenDetail ? (
              <div className="flex flex-col justify-around gap-5">
                <h1 className="text-2xl font-bold">พริกแกงใต้</h1>

                {/* วัตถุดิบ */}
                <div className="flex flex-col">
                  <label htmlFor="meat" className="font-semibold">
                    วัตถุดิบ (required)
                  </label>
                  <select
                    id="meat"
                    className="border p-2 rounded"
                    value={meat}
                    onChange={(e) => setMeat(e.target.value)}
                  >
                    <option value="" disabled>
                      กรุณาเลือก
                    </option>
                    <option value="หมู">หมู</option>
                    <option value="หมึก">หมึก</option>
                    <option value="กุ้ง">กุ้ง</option>
                  </select>
                </div>

                {/* ระดับความเผ็ด */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">
                    ระดับความเผ็ด (required)
                  </label>
                  {["เผ็ดน้อย", "เผ็ดกลาง", "เผ็ดมาก"].map((level) => (
                    <label
                      key={level}
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="spice"
                        value={level}
                        checked={spice === level}
                        onChange={(e) => setSpice(e.target.value)}
                      />
                      {level}
                    </label>
                  ))}
                </div>

                {/* พิเศษ */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">พิเศษ (optional)</label>
                  {["พิเศษ"].map((item) => (
                    <label
                      key={item}
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={specials.includes(item)}
                        onChange={handleSpecialChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>

                {/* ไม่ใส่ผัก */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">
                    ไม่ใส่ผัก (optional)
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={noVeggie}
                      onChange={(e) => setNoVeggie(e.target.checked)}
                    />
                    ไม่ใส่ผัก
                  </label>
                </div>

                {/* เพิ่มไข่ */}
                <div className="flex flex-col">
                  <label htmlFor="egg" className="font-semibold">
                    เพิ่มไข่ (optional)
                  </label>
                  <select
                    id="egg"
                    className="border p-2 rounded"
                    value={egg}
                    onChange={(e) => setEgg(e.target.value)}
                  >
                    <option value="">ไม่เลือก</option>
                    <option value="ไข่เจียว">ไข่เจียว</option>
                    <option value="ไข่ดาว">ไข่ดาว</option>
                    <option value="ไข่ต้ม">ไข่ต้ม</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  className="mt-4 px-4 py-2 bg-black text-white rounded w-fit"
                  onClick={handleSubmit}
                >
                  ยืนยันการเลือก
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-around gap-5 ">
                {/* menu ที่ เกียรเนะนำ */}
                <div className="w-[100%] h-[200px] mt-2 border">
                  เมนูเเนะนำ by gear
                  <div className="w-full h-[175px] mt-2 border  flex flex-row">
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3 ">
                      <div>พริกเเกงใต้</div>
                      <div className="h-full">
                        พริกเเกงใต้้ร้านนี้เผ็ดชิบหายเเนะนำเผ็ดน้อย
                      </div>
                    </div>
                  </div>
                </div>
                {/* menu n */}
                <p>menu</p>
                <div className="w-full h-[450px] flex flex-wrap justify-around gap-5 overflow-y-auto">
                  <div
                    className="w-[45%] h-[150px] border flex flex-row"
                    onClick={() => setOpenDetail(true)}
                  >
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3">
                      <div>menuname</div>
                      <div className="h-full">Description</div>
                    </div>
                  </div>

                  <div className="w-[45%] h-[150px] border flex flex-row">
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3">
                      <div>menuname</div>
                      <div className="h-full">Description</div>
                    </div>
                  </div>

                  <div className="w-[45%] h-[150px] border flex flex-row">
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3">
                      <div>menuname</div>
                      <div className="h-full">Description</div>
                    </div>
                  </div>
                  <div className="w-[45%] h-[150px] border flex flex-row">
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3">
                      <div>menuname</div>
                      <div className="h-full">Description</div>
                    </div>
                  </div>
                  <div className="w-[45%] h-[150px] border flex flex-row">
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3">
                      <div>menuname</div>
                      <div className="h-full">Description</div>
                    </div>
                  </div>
                  <div className="w-[45%] h-[150px] border flex flex-row">
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3 ">
                      <div>พริกเเกงใต้</div>
                      <div className="h-full">
                        พริกเเกงใต้้ร้านนี้เผ็ดชิบหายเเนะนำเผ็ดน้อย
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] h-[150px] border flex flex-row">
                    {/* ภาพตัวอย่าง */}
                    <div className="w-1/3">Image</div>
                    <div className="flex flex-col  w-2/3">
                      <div>menuname</div>
                      <div className="h-full">Description</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="w-1/2 p-4 cursor-pointer"
          onClick={() => setShowFirstSet(!showFirstSet)}
        >
          <div className="border h-full rounded-xl shadow gap-5 flex flex-row items-center justify-center font-bold text-xl transition-opacity duration-700">
            <div className="text-[50px]">รายละเอียการด์</div>
            <div>
              <div className="text-5xl">ชื่อร้านค้า</div>
              <div>รายละเอียดร้านค้า</div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-1/2 p-4">
          <div
            className={`h-full rounded-xl shadow flex items-center justify-center font-bold text-xl transition-all duration-700 ${
              !showFirstSet ? "bg-white opacity-100" : "bg-transparent "
            }`}
          >
            InputForm2
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
