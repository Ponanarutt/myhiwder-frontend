import React from "react";
import { IoHomeOutline, IoRibbonOutline } from "react-icons/io5";
import { FaRegClipboard } from "react-icons/fa";
import { LuClock1 } from "react-icons/lu";

const navItems = [
  { label: "Home", icon: <IoHomeOutline />, key: "Home" },
  { label: "Order", icon: <FaRegClipboard />, key: "Order" },
  { label: "History", icon: <LuClock1 />, key: "History" },
  { label: "About", icon: <IoRibbonOutline />, key: "About" },
];

const Header = ({ settopic }) => {
  return (
    <div className="h-full w-64 bg-gradient-to-b from-pink-500 to-pink-300 text-white shadow-xl flex flex-col px-6 py-8">
      {/* Logo / Title */}
      <div className="text-3xl font-extrabold mb-10 tracking-wide">MYHEYDER</div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => settopic(item.key)}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
