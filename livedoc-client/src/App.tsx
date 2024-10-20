import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { socket } from "./lib/socket";
const App = () => {
  const [Value, setValue] = useState("");
  const [SocketValue, setSocketValue] = useState("");
  useEffect(() => {
    // Prevent emitting the default empty content
    socket.timeout(5000).emit("msg", Value);
  }, [Value]);

  useEffect(() => {
    socket.on("msg", (value) => {
      setSocketValue(value);
    });
    return () => {
      socket.off("msg");
    };
  }, []);
  useEffect(() => {
    // Update the editor's value whenever SocketValue changes
    if (SocketValue !== Value) {
      setValue(SocketValue);
    }
  }, [SocketValue]);
  return <ReactQuill theme="snow" value={Value} onChange={setValue} />;
};

export default App;
