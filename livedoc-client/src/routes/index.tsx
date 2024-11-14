import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Protected from "./Protected";
import Docedits from "../components/pages/Docedits";
import Profile from "../components/pages/Profile";
import { DocDashboard } from "../components/pages/DocDashboard";
import NewTextEditor from "../components/Editor/NewTextEditor";

export default function IndexRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/" element={<DocDashboard />} />
          <Route path="document/:id" element={<NewTextEditor />} />
          <Route path="/editdocs" element={<Docedits />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
