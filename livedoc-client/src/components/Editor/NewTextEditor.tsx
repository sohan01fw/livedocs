import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";
const NewTextEditor = () => {
  const [socket, setSocket] = useState<Socket>();
  const [quill, setquill] = useState<Quill>();
  const { sessionId } = useAuth();

  useEffect(() => {
    const ss = io("http://localhost:8080", {
      auth: {
        token: sessionId,
      },
    });

    setSocket(ss);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      const content = quill?.getContents();
      console.log(content);
    }, 3000);
  }, [quill, socket]);

  /* useEffect(() => {
    if (socket == null || quill == null) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-msg", handler);
    return () => {
      socket.off("receive-msg", handler);
    };
  }, [quill, socket]); */
  /*   useEffect(() => {
    if (socket == null || quill == null) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket?.emit("msg", delta);
    };

    quill?.on("text-change", handler);
    return () => {
      quill?.off("text-change", handler);
    };
  }, [quill, socket]); */
  const editorRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const Q = new Quill(editor, { theme: "snow" });
    setquill(Q);
  }, []);

  return <div id="container" ref={editorRef}></div>;
};

export default NewTextEditor;
