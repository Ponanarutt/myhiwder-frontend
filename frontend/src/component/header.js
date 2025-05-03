import React from "react";

const Header = ({settopic}) => {
  return (
    <div className="text-white h-[45px] w-full px-8 font-semibold pt-7 flex justify-between items-center bg-black border border-black rounded-t-2xl">
      <div className="text-3xl">MYHEYDER</div>
      <div className="flex gap-x-6">
        <p onClick={() => settopic("Home")}>Home</p>
        <p onClick={() => settopic("Order")}>Order</p>
        <p  onClick={() => settopic("History")}>History</p>
        <p  onClick={() => settopic("Account")}>Account</p>
        <p  onClick={() => settopic("About")}>About</p>
      </div>
    </div>
  );
};

export default Header;
