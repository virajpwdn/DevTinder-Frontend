import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/appStore";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      // navigate("/login");
      window.location.href = "/login"
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {}, []);
  /* if user is authenticated then redirect him to feed else / page */
  const logoPath = user ? "/feed" : "/"
  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to={logoPath} className="btn btn-ghost text-xl">
            👨🏻‍💻 DevTinder
          </Link>
        </div>

        {user && (
          <div className="flex-none">
            {/* Mobile Dropdown Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <div className="px-2">Welcome, {user?.firstName}</div>
                </li>
                <li>
                  <Link to="/profile/view" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between">
                    Requests
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between">
                    Connections
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={logoutHandler}>Logout</a>
                </li>
              </ul>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              <div>Welcome, {user?.firstName}</div>
              <div className="dropdown dropdown-end mx-5">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="userimage"
                      src={
                        user?.photo ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile/view" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests" className="justify-between">
                      Requests
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections" className="justify-between">
                      Connections
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={logoutHandler}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
