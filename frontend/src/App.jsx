import { useEffect, useState } from "react";
import Orderpage from "./component/Orderpage";
import Header from "./component/header";
import About from "./component/About";
import CardSlider from "./component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeA from "./Admin/HomeA";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function App() {
  const [topic, settopic] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [islogin, setislogin] = useState(false);
  const [formdata, setformdata] = useState({ email: "", password: "" });

  const onhandlechange = (event) => {
    const { name, value } = event.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setislogin(true);
  };

  return (
    <>
      {islogin ? (
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<HomeA />} />
            <Route
              path=""
              element={
                <div className="flex h-screen w-screen font-sans bg-[#F1EFEC] overflow-hidden">
                  <Header
                    settopic={settopic}
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                  />
                  <div className="flex-1 overflow-y-auto">
                    <div
                      key={topic}
                      className="h-full w-full transition-opacity duration-300 ease-in animate-fadeIn"
                    >
                      {topic === "Home" && <CardSlider />}
                      {topic === "Order" && <Orderpage />}
                      {topic === "About" && <About />}
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="flex h-screen min-w-[330px]">
          <div className="w-1/2 bg-gradient-to-br from-blue-400 to-blue-700  items-center justify-center hidden sm:flex">
            <img
              src="/login-img.png"
              alt="Login Illustration"
              className="w-80 h-auto"
            />
          </div>
          <div className="w-full sm:w-1/2 flex items-center justify-center bg-white">
            <div className="w-full max-w-sm px-6">
              <div className="mb-6 text-center">
                <img
                  src="/image.png"
                  alt="Logo"
                  className="mx-auto mb-2 h-20 w-50"
                />
                <p className="text-gray-500 text-sm">
                  ยินดีต้อนรับกลับมา! เข้าสู่ระบบเพื่อสั่งอาหารกัน
                </p>
              </div>

              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={onhandlechange}
                    placeholder="อีเมล"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    onChange={onhandlechange}
                    placeholder="รหัสผ่าน"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
                  {/* ลืมรหัสผ่าน */}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  เข้าสู่ระบบ
                </button>
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  <FcGoogle />
                  เข้าสู่ระบบด้วย Google
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
