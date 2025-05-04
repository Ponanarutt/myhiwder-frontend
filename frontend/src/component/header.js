import React from "react";

const Header = ({settopic}) => {
  return (
    <div className=" h-[35px] w-full px-8 font-semibold pt-10 flex justify-between items-center z-50 bg-transparent text-white">
      <div className="text-3xl text-black">MYHEYDER</div>
      <div className="flex gap-x-6 border px-3 rounded-md py-1">
        <p onClick={() => settopic("Home")} className="border rounded-md bg-[#DA4A7A] px-1">Home</p>
        <p onClick={() => settopic("Order")}  className="border rounded-md bg-[#DA4A7A] px-1">Order</p>
        <p  onClick={() => settopic("History")}  className="border rounded-md bg-[#DA4A7A] px-1">History</p>
        <p  onClick={() => settopic("Account")}  className="border rounded-md bg-[#DA4A7A] px-1">Account</p>
        <p  onClick={() => settopic("About") } className="border rounded-md bg-[#DA4A7A] px-1">About</p>
      </div>
    </div>
  );
};

export default Header;
