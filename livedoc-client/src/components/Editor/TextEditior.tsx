import React, { TextareaHTMLAttributes, forwardRef } from 'react';

// Define the interface for the props
interface EditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string; // Optional string prop for the textarea's value
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Optional change event handler
}

// Create the Editor component with forwardRef
const Editor = forwardRef<HTMLTextAreaElement, EditorProps>((props, ref) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav style={{ height: "50px", backgroundColor: "#333", color: "#fff", padding: "10px" }}>
        <h1>Editor Navbar</h1>
      </nav>

      {/* Fullscreen Text Area */}
      <textarea
        {...props} // Spread the props to include all defined props
        ref={ref} // Attach the ref to the textarea
        style={{
          flex: 1, // Takes the remaining height of the screen
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "none",
          outline: "none",
          resize: "none", // Prevent resizing
        }}
      />
    </div>
  );
});

Editor.displayName = "Editor"; // Set display name for better debugging in React DevTools

export default Editor;
