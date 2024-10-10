import  { useState, useRef } from "react";

const TextEditor = () => {
  const [fontSize, setFontSize] = useState("16px");
  const editorRef = useRef(null);

  // Apply formatting to selected text
  const applyCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ marginBottom: "10px" }}>
        {/* Bold Button */}
        <button onClick={() => applyCommand("bold")}>Bold</button>

        {/* Italic Button */}
        <button onClick={() => applyCommand("italic")}>Italic</button>

        {/* Font Size Dropdown */}
        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            applyCommand("fontSize", 7); // Use a fixed value for execCommand
            const fontElements = document.getElementsByTagName("font");
            for (let i = 0; i < fontElements.length; i++) {
              if (fontElements[i].size === "7") {
                fontElements[i].removeAttribute("size");
                fontElements[i].style.fontSize = e.target.value;
              }
            }
          }}
        >
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>

        {/* Alignment Buttons */}
        <button onClick={() => applyCommand("justifyLeft")}>Left</button>
        <button onClick={() => applyCommand("justifyCenter")}>Center</button>
        <button onClick={() => applyCommand("justifyRight")}>Right</button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        style={{
          border: "1px solid #ccc",
          minHeight: "200px",
          padding: "10px",
          fontSize: fontSize,
        }}
      >
        Start typing here...
      </div>
    </div>
  );
};

export default TextEditor;
