import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Submit from "./components/Submit";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign-up" element={<Signup />} />
            <Route exact path="/submit" element={<Submit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
