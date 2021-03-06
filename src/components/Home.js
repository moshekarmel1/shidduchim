import logo from "./../logo.svg";
import MySubmissions from "./MySubmissions";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "./Service";

function Home() {
  const navigate = useNavigate();
  const token = getToken();
  return (
    <div>
      <div className="text-center">
        <img height="200" src={logo} className="App-logo" alt="logo" />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            <p className="fs-5 text-muted">
              Yeshivish Shidduchim is a free online platform that connects you
              with the best Jewish community in the world.
            </p>
          </div>
        </div>
      </div>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="col d-flex align-items-start">
          <div className="icon-square text-dark flex-shrink-0 me-3">
            <i className="fa-solid fa-magnifying-glass-location fa-2xl"></i>
          </div>
          <div>
            <h2>Search</h2>
            <p>
              Narrow down the search when finding your fish in the sea.
            </p>
            <Link to="/search" className="btn btn-primary">Search &raquo;</Link>
          </div>
        </div>
        <div className="col d-flex align-items-start">
          <div className="icon-square text-dark flex-shrink-0 me-3">
          <i className="fa-solid fa-file fa-2xl"></i>
          </div>
          <div>
            <h2>Submit Resumes</h2>
            <p>
              It's a lot easier than asking your shvugger to email it to you.
            </p>
            <Link to="/submit" className="btn btn-primary">
              Submit Resumes &raquo;
            </Link>
          </div>
        </div>
        <div className="col d-flex align-items-start">
          <div className="icon-square text-dark flex-shrink-0 me-3">
            <i className="fa-solid fa-scroll-torah fa-2xl"></i>
          </div>
          <div>
            <h2>Yeshivishness</h2>
            <p>
              It's the secret sauce that powers the matching algorithm.
            </p>
            <Link to="/faq" className="btn btn-primary">
              Find out more &raquo;
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {token && <MySubmissions />}
        </div>
        <div className="col-md-6">
          
        </div>
      </div>
    </div>
  );
}

export default Home;
