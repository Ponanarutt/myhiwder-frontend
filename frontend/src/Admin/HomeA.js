"use client";

import React from "react";
import CreatePage from "./Create";
import MainA from "./mainA";
import OrderA from "./OrderA";
import { useEffect, useState } from "react";

// Mock data สำหรับร้านค้าและรายการสั่งอาหาร
const initialShops = [
  {
    id: 1,
    name: "ร้านไก่ทอดผู้พันธ์",
    selected: true,
    menus: [
      { id: 1, name: "ข้าวมันไก่ทอด พิเศษ", count: 1, orderedBy: ["สมชาย"] },
      {
        id: 2,
        name: "ข้าวมันไก่ทอด ธรรมดา",
        count: 9,
        orderedBy: [
          "มานี",
          "มานะ",
          "สมศรี",
          "วิชัย",
          "อรุณ",
          "พิมพ์",
          "สุดา",
          "ประเสริฐ",
          "ชัยวัฒน์",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "ก๋วยเตี๋ยวเรือนายหงษ์",
    selected: false,
    menus: [
      {
        id: 1,
        name: "ก๋วยเตี๋ยวต้มยำหมู",
        count: 3,
        orderedBy: ["สมศักดิ์", "วิภา", "รัชนี"],
      },
      {
        id: 2,
        name: "ก๋วยเตี๋ยวเย็นตาโฟ",
        count: 2,
        orderedBy: ["สมหมาย", "วิเชียร"],
      },
    ],
  },
  {
    id: 3,
    name: "ส้มตำแซ่บนัว",
    selected: false,
    menus: [
      {
        id: 1,
        name: "ตำไทย",
        count: 4,
        orderedBy: ["สมใจ", "นงนุช", "ประภา", "ชัยณรงค์"],
      },
      {
        id: 2,
        name: "ไก่ย่าง",
        count: 2,
        orderedBy: ["กลุ่มสมใจ", "กลุ่มประภา"],
      },
    ],
  },
];

const HomeA = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [TopicA, setTopicA] = useState("Home");

  // Theme colors
  const colors = {
    bgLight: "rgb(241, 239, 236)",
    accent: "rgb(212, 201, 190)",
    primary: "rgb(18, 52, 88)",
    text: "rgb(3, 3, 3)",
  };

  return (
    <div
      className="w-full min-h-screen p-4"
      style={{ backgroundColor: colors.bgLight }}
    >
      <div className="flex justify-between items-center p-6 rounded-lg shadow-md mb-4 bg-white">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
            Admin Dashboard
          </h2>
          <div
            className="flex flex-wrap items-center text-base mt-2 gap-4"
            style={{ color: colors.text }}
          >
            <div className="flex items-center gap-1">
              <span>📍</span> Remote
            </div>
            <div className="flex items-center gap-1">
              <span>📅</span> Date on January 9, 2025
            </div>
          </div>
        </div>

        {!isMobile && (<div className="flex gap-2">
          {["Home", "Order", "Create"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTopicA(tab)}
              className={`px-5 py-2 rounded-md text-base font-semibold transition ${
                TopicA === tab
                  ? "text-white shadow-md"
                  : "text-white hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  TopicA === tab ? colors.primary : colors.accent,
              }}
            >
              {tab}
            </button>
          ))}
        </div>)}
      </div>
      {isMobile && (<div className="flex gap-2 w-full">
          {["Home", "Order", "Create"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTopicA(tab)}
              className={`px-5 py-2 w-[33%]  rounded-md text-base font-semibold transition ${
                TopicA === tab
                  ? "text-white shadow-md"
                  : "text-white hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  TopicA === tab ? colors.primary : colors.accent,
              }}
            >
              {tab}
            </button>
          ))}
        </div>)}

      {TopicA === "Home" ? (
        <MainA className="w-full" initialShops={initialShops} />
      ) : TopicA === "Order" ? (
        <OrderA className="w-full" />
      ) : (
        <CreatePage />
      )}
    </div>
  );
};

export default HomeA;
