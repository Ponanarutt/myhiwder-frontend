import { useState } from "react";
import Homepage from "./component/Homepage";
import Header from "./component/header";
import About from "./component/About";
import OrderForm from "./component/OrderForm";

function App() {
  const [topic, settopic] = useState("Home");

  return (
    <div className=" min-h-screen bg-white font-sans  transition-all ease-in-out"
    style={{
      backgroundImage: "url('/jared.jpg')",
      backgroundSize: "100%",
    }}
    >
      <Header settopic={settopic} />
      {topic === "Home" && (
        <div className="overflow-x-auto mt-3 ">
          <Homepage />
        </div>
      )}
      {topic === "About" && (
        <div className="overflow-x-auto  ">
          <div>
            <About />
          </div>
        </div>
      )}
      {topic === "Order" && (
        <div className="overflow-x-auto  ">
          <div>
            <OrderForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
