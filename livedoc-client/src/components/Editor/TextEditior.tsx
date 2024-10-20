import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { socket } from "../../lib/socket";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
export const TextEditior = () => {
  const [Value, setValue] = useState("");
//   const [SocketValue, setSocketValue] = useState("");
  const { isSignedIn,isLoaded } = useUser();

/* 
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
  }, [SocketValue]); */
  if(!isLoaded)
  {
    return <div>loadin....</div>
  }
  if (Value && !isSignedIn) {
    console.log("user not logged in");
    return <Navigate to="/login" />;
  }
  return <ReactQuill theme="snow" value={Value} onChange={setValue} />;
};
