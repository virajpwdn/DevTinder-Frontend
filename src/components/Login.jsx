import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setSuccess(res.data.message);
      navigate("/profile/view");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      setError("");
      dispatch(addUser(res.data));
      navigate("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-80 max-w-sm shrink-0 shadow-2xl">
            <form
              className="card-body"
              onSubmit={isLoggedIn ? loginHandler : signupHandler}
            >
              <h1 className="font-semibold text-xl text-center">
                {isLoggedIn ? "Login" : "Sign up"}
              </h1>

              {!isLoggedIn && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">FirstName</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="input input-bordered"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">LastName</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="input input-bordered"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="input input-bordered"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <p className="text-red-500 text-xs">{error}</p>
              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {isLoggedIn ? "Login" : "Signup"}
                </button>
              </div>
              <p
                className="text-xs cursor-pointer hover:underline text-center pt-2"
                onClick={() => setIsLoggedIn((value) => !value)}
              >
                {isLoggedIn ? "New User? Sign up" : "Existing User? Login Here"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
