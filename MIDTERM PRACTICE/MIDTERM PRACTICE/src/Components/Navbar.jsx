import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "../Components/About";
import Search from "../Components/Search";
import Home from "../Components/Home";
import "../Styles/navbar.css";

function Navbar() {
  return (
    <BrowserRouter>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Navbar;
