import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { socket } from "../../lib/socket";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
export const TextEditior = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [Value, setValue] = useState("");
     const [SocketValue, setSocketValue] = useState("");
  const { isSignedIn, isLoaded } = useUser();
  const socket = io("http://localhost:8080", {
    async auth(cb) {
      const token = await getToken();
      cb({
         token,
      });
    },
  });

  useEffect(() => {
    // Prevent emitting the default empty content
    socket.timeout(5000).emit("roomId", id);
  }, [id]);

  useEffect(() => {
    // Prevent emitting the default empty content
    socket.timeout(5000).emit("msg", { text: Value, roomId: id });
  }, [Value]);

  useEffect(() => {
    socket.on("connect_error",(err)=>{
         console.log(err.message);
         navigate("/login")
    })
    socket.on("msg", (text) => {
      setSocketValue(text);
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
  if (!isLoaded) {
    return <div>loadin....</div>;
  }
  if (Value && !isSignedIn) {
    console.log("user not logged in");
    return <Navigate to="/login" />;
  }
  return <ReactQuill theme="snow" value={Value} onChange={setValue} />;
};
