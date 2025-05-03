import { useState } from "react";
import Homepage from "./component/Homepage";
import Header from "./component/header";

function App() {
  const [topic, settopic] = useState("Home");




  return (
    <div className="min-h-screen bg-white font-sans p-3 border  rounded-2xl">
      <Header settopic={settopic} />
      <div className="overflow-x-auto gap-4 ">
  <Homepage />


</div>
    </div>
  );
}

export default App;
