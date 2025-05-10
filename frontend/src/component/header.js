import React, { useState } from "react";
import {
  IoHomeOutline,
  IoRibbonOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { FaRegClipboard } from "react-icons/fa";
import GoogleButton from 'react-google-button'

const navItems = [
  { label: "Home", icon: <IoHomeOutline />, key: "Home" },
  { label: "Order", icon: <FaRegClipboard />, key: "Order" },
  { label: "About", icon: <IoRibbonOutline />, key: "About" },
];

const Header = ({ settopic }) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleToggle = () => {
    if (window.innerWidth >= 640) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-[#F1EFEC] text-[#030303] flex flex-col px-3 py-6 border-r transition-all relative duration-300 drop-shadow-2xl `}
    >
      {/* Toggle */}
      <div
        className={`flex items-center ${
          !isOpen ? "justify-center" : "justify-start px-3"
        } mb-6 px-1 `}
      >
        <button
          onClick={() => handleToggle()}
          className="text-xl text-[#123458] hover:scale-110 transition  flex flex-row  items-center"
        >
          {isOpen ? <IoClose /> : <IoMenu />}
          {isOpen && (
            <h1 className="text-lg font-bold tracking-tight text-[#123458] uppercase">
              Myhiwder
            </h1>
          )}
        </button>
      </div>

      {/* Nav */}
      <div className="flex flex-col  h-full justify-between">
        <div className="flex flex-col  gap-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => settopic(item.key)}
              className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#123458] hover:bg-[#D4C9BE]/50 transition-all duration-200 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen ? (
                <span>{item.label}</span>
              ) : (
                <span className="absolute left-full ml-2 w-max opacity-0 group-hover:opacity-100 bg-[#123458] text-white text-xs px-2 py-1 rounded shadow transition-opacity">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
        <GoogleButton
              type="dark"
              className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#123458] hover:bg-[#D4C9BE]/50 transition-all duration-200 ${
                isOpen ? "justify-start" : "justify-center"
              }`} >Login</GoogleButton>
      </div>
    </div>
  );
};

export default Header;
