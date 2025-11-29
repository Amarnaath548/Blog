import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";


const Register = () => { 
  const [showPassword, setShowPassword] = useState(false);
  const [loggingin, setLoggingin] = useState(false); // Should be 'registering'
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login, isDarkMode } = useContext(AuthContext); // isDarkMode is correctly destructured
  const navigate = useNavigate();

  
  const formControlClass = isDarkMode 
    ? "form-control bg-secondary text-white border-light" 
    : "form-control";

  const togglePasswordVisibility = () => {
    setShowPassword((pre) => !pre);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoggingin(true);
      
      const res = await API.post("auth/register", form); 
      login(res.data);
      setLoggingin(false);
      toast.success(`Welcome ${res.data.user.username}`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed. Please try again.");
      setLoggingin(false); 
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        
        <div className={`card shadow p-4 ${isDarkMode ? "bg-dark text-white border-light" : ""}`}>
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
                className={formControlClass}
                onChange={(e) => { setForm({ ...form, username: e.target.value }); }}
                required
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
                className={formControlClass}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); }}
                required
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
                className={formControlClass}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); }}
                required
              />
              
              
              <p className={`fw-light mt-1 ${isDarkMode ? "text-secondary" : ""}`}>
                Password must be at least 6 characters long
              </p>
              
              
              <button
                type="button" // Important to prevent form submission
                className={`mt-3 btn ${isDarkMode ? "btn-outline-light" : "btn-light"}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            
            
            {loggingin ? (
             
              <p className={`text-info ${isDarkMode ? "text-light" : ""}`}>
                Registering, please wait...
              </p>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
};


export default Register;