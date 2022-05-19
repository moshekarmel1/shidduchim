import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { setToken, signupUser } from "./Service";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signupUser({
      email,
      password,
    });
    setToken(token);
    navigate("/home");
  };

  return (
    <div className="login text-center">
      <main className="form-signin">
        <div className="pt-0 mb-2 shadow-lg p-3 mb-5 bg-body rounded">
          <form className="" onSubmit={handleSubmit}>
            <a href="/">
              <img
                className="mb-4"
                src="img/shidduch.svg"
                alt=""
                width="272"
                height="257"
              />
            </a>
            <h1 className="h3 mb-3 fw-normal">
              If you haven't been here before, try signing up
            </h1>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-4"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-4"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
              type="submit"
            >
              Sign up
            </button>
            <small className="text-muted">
              By clicking Sign up, you agree to the terms of use.
            </small>
            <hr className="my-4" />
            <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
            <button
              className="w-100 py-2 mb-2 btn btn-outline-dark rounded-4"
              type="submit"
            >
              Sign up with Twitter
            </button>
            <button
              className="w-100 py-2 mb-2 btn btn-outline-primary rounded-4"
              type="submit"
            >
              Sign up with Facebook
            </button>
            <button
              className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-4"
              type="submit"
            >
              Sign up with GitHub
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Signup;
