import Quill from "quill"
import { useEffect } from "react"
import "quill/dist/quill.snow.css";
const NewTextEditor = () => {
  useEffect(() => {
   new Quill("#container",{theme:"snow"}); 
   //helolo
  }, [])
  
  return (
    <div id="container">hellow</div>
  )
}

export default NewTextEditor