import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Header from "./components/main/Header.jsx";
import Home from "./routes/Home.jsx";
import Auth from "./routes/Auth.jsx";

function App() {
  return (
      <div className="bg-gray-800 h-screen">
          <Router>
              <Header/>
              <Routes>
                  <Route path="/login" element={<Auth />}/>
                  <Route path="/home" element={<Home />}/>
                  <Route path="/register" element={<Auth />}/>

                  <Route path="/" component={<Navigate to="/home"/>}/>
                  {/* Redirect any other path to "/login" */}
                  <Route path="*" element={<Navigate to="/login"/>}/>
              </Routes>
          </Router>
      </div>
  )
}

export default App
