import panda from "./../panda.PNG";
import { Link } from "react-router-dom";
import { isLoggedIn, getUserData } from "./Service";

function Header() {
  const loggedIn = isLoggedIn();
  const userData = getUserData();

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <img src={panda} className="bi me-2" width="40" height="32" />
        <span className="fs-4">Yeshivish Shidduchim</span>
      </Link>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link to="/" className="nav-link px-2 link-secondary">
            Home
          </Link>
        </li>
        <li>
          <a href="#" className="nav-link px-2 link-dark">
            Features
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2 link-dark">
            Pricing
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2 link-dark">
            FAQs
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2 link-dark">
            About
          </a>
        </li>
      </ul>

      <div className="col-md-3 text-end">
        {loggedIn ? (
          <div>
            <span style={{marginRight: 5 + 'px'}} className="fs-7 ml-2">Welcome {userData.email}!</span>
            <Link
              className="btn btn-sm btn-outline-primary me-2"
              to="/logout"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <Link
              className="btn btn-outline-primary me-2"
              to="/login"
            >
              Login
            </Link>
            <Link className="btn btn-primary" to="/sign-up">
              Sign-up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
