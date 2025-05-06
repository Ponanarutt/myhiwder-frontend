import { useState } from "react";
import Orderpage from "./component/Orderpage";
import Header from "./component/header";
import About from "./component/About";
import CardSlider from "./component/Home";

function App() {
  const [topic, settopic] = useState("Home");

  return (
    <div className="min-h-screen bg-white font-sans flex w-full">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 shadow-md">
        <Header settopic={settopic} />
      </div>

      {/* Main Content with fade-in */}
      <div className="p-6 overflow-y-auto w-full">
        <div
          key={topic}
          className="transition-opacity duration-500 ease-in opacity-0 animate-fadeIn"
        >
          {topic === "Home" && <CardSlider/>}
          {topic === "Order" && <Orderpage/>}
          {topic === "About" && <About />}
        </div>
      </div>
    </div>
  );
}

export default App;
