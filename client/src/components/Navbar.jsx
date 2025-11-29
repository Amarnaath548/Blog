import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import darkMode from "../assets/dark_mode.svg";
import lightMode from "../assets/light_mode.svg";

const Navbar = () => {
  const { user, logout, isDarkMode, toggleDarkMode } = useContext(AuthContext);
  console.log("Dark mode in Navbar:", isDarkMode);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Blog
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Dark Mode Toggle */}
            <li className="nav-item d-flex align-items-center">
              <button
                onClick={toggleDarkMode}
                className="btn btn-link nav-link p-0"
                style={{ border: "none" }}
              >
                <img
                  src={isDarkMode ? lightMode : darkMode}
                  alt="theme toggle"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </li>

            {/* Auth Links */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Create Post
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
