import React, { useRef } from "react";
import Editor from "./components/Editor/TextEditior";

const ParentComponent = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Create a ref of type HTMLTextAreaElement

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };


  return (
    <div>
      <Editor
        ref={textareaRef} // Pass the ref to the Editor component
        onChange={handleChange}
        placeholder="Start typing from here...."
      />
    </div>
  );
};

export default ParentComponent;
