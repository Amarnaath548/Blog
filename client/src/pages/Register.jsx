import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const togglePasswordVisibility = () => {
    setShowPassword((pre) => !pre);
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("auth/register", form);
    login(res.data);
    navigate("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card shadow p-4">
          <h3 className="text-center mb-3">Register</h3>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={form.username}
                className="form-control"
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                className="form-control"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                id="password"
                className="form-control"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
              <button
                className="mt-3 btn btn-light"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
