import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Protected from "./Protected";
import Docedits from "../components/pages/Docedits";
import Profile from "../components/pages/Profile";
import { TextEditior } from "../components/Editor/TextEditior";
import { DocDashboard } from "../components/pages/DocDashboard";

export default function IndexRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocDashboard />} />
        <Route path={`/document/:id`} element={<TextEditior />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/editdocs" element={<Docedits />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
