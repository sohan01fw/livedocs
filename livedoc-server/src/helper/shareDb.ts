import { backend } from "../server";
//@ts-ignore
import otjson0 from "ot-json0"

export function createDocIfNotExist() {
   const connection = backend.connect();
   const doc = connection.get("documents","docId");
   doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({ content: "" }, otjson0.type.name);
    }
})
}