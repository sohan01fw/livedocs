import IndexRoute from "./routes";
import { MyForm } from "./components/sockets/MyForm";
import { socket } from "./lib/socket";
import { useState } from "react";
function App() {
  const [value, setvalue] = useState<string>()
socket.on("msg",(msg)=>{
  setvalue(msg);
}) 
  return (
    <div className="h-screen" data-theme="light">
      <IndexRoute />
      <div className="div">
        <MyForm />
        <h3>{value}</h3>
      </div>
    </div>
  );
}

export default App;
