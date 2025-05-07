import { useState } from "react";
import Orderpage from "./component/Orderpage";
import Header from "./component/header";
import About from "./component/About";
import CardSlider from "./component/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeA from "./Admin/HomeA";

function App() {
  const [topic, settopic] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Route */}
        <Route path="/admin" element={<HomeA />} />

        {/* User Interface Routes */}
        <Route path="" element={
          <div className="flex h-screen w-screen font-sans bg-[#F1EFEC] overflow-hidden">
            {/* Sidebar/Header */}
            <Header
              settopic={settopic}
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
            />

            {/* Main Content */}
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
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
