import "./Login.css";

function Signup() {
  return (
    <div className="login text-center">
      <main class="form-signin">
        <div class="pt-0 mb-2 shadow-lg p-3 mb-5 bg-body rounded">
          <form class="">
            <a href="/">
              <img
                class="mb-4"
                src="img/shidduch.svg"
                alt=""
                width="272"
                height="257"
              />
            </a>
            <h1 class="h3 mb-3 fw-normal">
              If you haven't been here before, try signing up
            </h1>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control rounded-4"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control rounded-4"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button
              class="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
              type="submit"
            >
              Sign up
            </button>
            <small class="text-muted">
              By clicking Sign up, you agree to the terms of use.
            </small>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-dark rounded-4"
              type="submit"
            >
              Sign up with Twitter
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-primary rounded-4"
              type="submit"
            >
              Sign up with Facebook
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-4"
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
