import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io, Socket } from "socket.io-client";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
const NewTextEditor = () => {
  const [socket, setSocket] = useState<Socket>();
  const [quill, setquill] = useState<Quill>();
  const { sessionId } = useAuth();
  const { user } = useUser();
  const { id } = useParams();

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
        setSocket(undefined)
      }
    };
  }, [sessionId]);

  useEffect(() => {
    
    const handleError = (err) => {
      console.log(err);
    };

    socket?.on("error", handleError);
    return () => {
      socket?.off("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (!socket || !id || !user) return; // Ensure all required dependencies are available

    const data = {
      userId: user.id,
      docId: id,
    };

    socket.emit("get-doc", data);

    // Optionally handle cleanup if necessary
  }, [socket, id, user]);

  useEffect(() => {
    if (!socket || !quill) return; // Ensure all required dependencies are available
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const handleLoadData = (data) => {
      if (data) {
        quill?.setContents(data);
      }
    };
    socket.off("load-data", handleLoadData); // Remove any previous listener
    socket?.on("load-data", handleLoadData);

    return () => {
      socket?.off("load-data", handleLoadData);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (!quill || !socket || !id) return;
  
    const debouncedEmit = debounce((content) => {
      const data = {
        docId: id,
        content: content.ops,
      };
      socket?.emit("save-doc", data);
    }, 2000);
  
    const handleContentChange = () => {
      const content = quill?.getContents();
      debouncedEmit(content);
    };
  
    quill.on('text-change', handleContentChange);
  
    return () => {
      quill.off('text-change', handleContentChange);
      debouncedEmit.cancel();
    };
  }, [id, quill, socket]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-text", handler);
    return () => {
      socket.off("receive-text", handler);
    };
  }, [quill, socket]);
  useEffect(() => {
    if (socket == null || quill == null) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket?.emit("doc-text", delta);
    };

    quill?.on("text-change", handler);
    return () => {
      quill?.off("text-change", handler);
    };
  }, [quill, socket]);
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
