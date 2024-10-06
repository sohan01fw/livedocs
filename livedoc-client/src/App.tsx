import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Protected from './routes/Protected'
import Docedits from './components/pages/docedits'
import Profile from './components/pages/profile'

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Protected />}>
              <Route path="/editdocs" element={<Docedits />} />
            </Route>
            <Route path="/profile" element={<Profile />} />

          </Routes>
      </Router>
    </div>
  )
}

export default App


