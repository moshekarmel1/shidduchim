import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { loginUser, setToken } from "./Service";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    navigate("/");
  };

  return (
    <div className="login text-center">
      <main className="form-signin">
        <div className="pt-0 mb-2 shadow-lg p-3 mb-5 bg-body rounded">
          <form onSubmit={handleSubmit}>
            <a href="/">
              <img
                className="mb-4"
                src="img/shidduch.svg"
                alt=""
                width="272"
                height="257"
              />
            </a>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
            <Link className="w-100 btn btn-link" to="/sign-up">
              Or, if you're new here, Sign up
            </Link>
            <p className="mt-5 mb-3 text-muted">© 2022</p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
