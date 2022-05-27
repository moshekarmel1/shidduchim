import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Submit from "./components/Submit";
import Zivug from "./components/Zivug";
import References from "./components/References";
import Education from "./components/Education";
import Family from "./components/Family";
import View from "./components/View";

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
            <Route exact path="/view/:zivug_id" element={<View />} />
            <Route exact path="/zivug/:zivug_id" element={<Zivug />} />
            <Route exact path="/zivug/:zivug_id/references" element={<References />} />
            <Route exact path="/zivug/:zivug_id/education" element={<Education />} />
            <Route exact path="/zivug/:zivug_id/family" element={<Family />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
