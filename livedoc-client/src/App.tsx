import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './App.css';
import { socket } from './lib/socket';

export default function App() {
  const [value, setValue] = useState<string>(""); // Hold the value coming from the socket
  const editorRef = useRef<any>(null); // Ref for the editor instance

  useEffect(() => {
    // Listen for incoming messages from the socket server
    socket.on("msg", (event) => {
      // Update the content only if it's different to prevent cursor jump
      if (editorRef.current && value !== event) {
        const editor = editorRef.current;
        
        // Save the current cursor position
        const { selection } = editor;
        selection.getBookmark();

        // Set the new content
        editor.setContent(event, { format: 'text' });
        
        // Restore the cursor position
        selection.moveToBookmark(selection.getBookmark());
      }
      
      // Update the state with new content from the socket
      setValue(event); 
    });

    // Cleanup on component unmount
    return () => {
      socket.off("msg");
    };
  }, [value]);

  // Send the updated content via the socket when the user types
  const handleEditorChange = (newContent: string) => {
    // Emit content via socket only if it has changed
    if (newContent !== value) {
      socket.timeout(5000).emit("msg", newContent); // Emit content via socket
      setValue(newContent); // Update local state
    }
  };

  return (
    <>
      <Editor
        apiKey='hdxo1k6k89qoxom5udku2kd0o83m3ttda0wbuf6xm0vh9oee'
        onInit={(_evt, editor) => editorRef.current = editor}
        onEditorChange={handleEditorChange} // Emit changes via socket
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
}
