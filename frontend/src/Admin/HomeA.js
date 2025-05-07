"use client";

import React from "react";

import MainA from "./mainA";
import OrderA from "./OrderA";
import { useState } from "react";

const HomeA = () => {
  const [TopicA, setTopicA] = useState("Home");
  console.log(TopicA)

  return (
    <div className="w-full min-h-screen p-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <div className="flex flex-wrap items-center text-gray-500 text-sm mt-2 gap-4">
            <div className="flex items-center gap-1">
              <span>📍</span> Remote
            </div>
            <div className="flex items-center gap-1">
              <span>📅</span> Date on January 9, 2025
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTopicA("Home")}
            className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-[#123458] hover:bg-[#D4C9BE]/50 transition"
          >
            Home
          </button>
          <button
            onClick={() => setTopicA("Order")}
            className="text-white px-4 py-2 rounded-md text-sm font-semibold bg-[#123458] hover:bg-[#D4C9BE]/50 transition"
          >
            Order
          </button>
          <button
            onClick={() => setTopicA("Create")}
            className="text-white bg-[#123458]  px-4 py-2 rounded-md text-sm font-semibold transition  hover:bg-[#D4C9BE]/50"
          >
            Create
          </button>
          <button
            onClick={() => setTopicA("History")}
            className="text-white px-4 py-2 rounded-md text-sm font-semibold bg-[#123458] hover:bg-[#D4C9BE]/50 transition"
          >
            History
          </button>
        </div>
      </div>
      {TopicA === "Home" ? (
        <MainA className="w-full" />
      ) : TopicA === "Order" ? (
        <OrderA className="w-full" />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HomeA;
