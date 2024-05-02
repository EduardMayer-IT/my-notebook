import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Header from "./components/main/Header.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Notes from "./routes/Notes.jsx";

function App() {
  return (
      <div className="bg-gray-800 h-screen">
          <Router>
              <Header/>
              <Routes>
                  <Route path="/home" element={<Home />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/notes" element={<Notes />}/>
                  <Route path="/" component={<Navigate to="/home"/>}/>
                  {/* Redirect any other path to "/login" */}
                  <Route path="*" element={<Navigate to="/home"/>}/>
              </Routes>
          </Router>
      </div>
  )
}

export default App
