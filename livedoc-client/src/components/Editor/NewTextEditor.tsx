import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io, Socket } from "socket.io-client";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Link, useParams } from "react-router-dom";
import { debounce } from "lodash";
import { URL } from "../../lib/socket";
const NewTextEditor = () => {
  const [socket, setSocket] = useState<Socket>();
  const [quill, setquill] = useState<Quill>();
  const [quillData, setQuillData] = useState();
  const { sessionId } = useAuth();
  const { user } = useUser();
  const { id } = useParams();
  let version = 0;
  useEffect(() => {
    const ss = io(URL, {
      auth: {
        token: sessionId,
      },
    });
    setSocket(ss);

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(undefined);
      }
    };
  }, [sessionId]);

  useEffect(() => {
    const handleError = (err: Error) => {
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
      //console.log(data.content[0].data[0]);
      if (data.content === undefined || !data || data.id === null) {
        console.log("no doc data receive");
      }
      if (data?.content?.length > 0) {
        const quillData = {
          ops: [data?.content[0]?.data[0]],
        } as any;
        quill?.setContents(quillData);
        quill.enable();
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

    // Debounced function to send the entire editor content
    const sendContent = debounce(() => {
      const content = quill.getContents(); // Fetch the current full content
      const data = {
        docId: id,
        content: content.ops,
        timestamp: Date.now(),
        clientVersion: version,
      };
      socket.emit("save-doc", quillData ? quillData : data);
    }, 2000); // 2-second delay after inactivity

    // Listener for text changes
    const handleContentChange = () => {
      sendContent(); // Call the debounced function on every text change
    };
    quill.off("text-change", handleContentChange);
    quill.on("text-change", handleContentChange);

    return () => {
      quill.off("text-change", handleContentChange);
      sendContent.cancel(); // Clean up the debounced function
    };
  }, [id, quill, socket]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const handler = (deltaData) => {
      quill.updateContents(deltaData.content.ops);
      setQuillData(deltaData);
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
      const data = {
        docId: id,
        content: delta, // Send only the final content
        timestamp: Date.now,
        clientVersion: ++version,
      };
      if (source !== "user") return;
      socket?.emit("doc-text", data);
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
    quill?.disable();
    quill?.setText("loading...");
  }, []);

  return (
    <>
      <Link to={"/dashboard"} className="cursor-pointer">
        <h2 className=" m-2 bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text text-2xl font-semibold">
          LiveDocs
        </h2>
      </Link>
      <div id="container" ref={editorRef}></div>
    </>
  );
};

export default NewTextEditor;
