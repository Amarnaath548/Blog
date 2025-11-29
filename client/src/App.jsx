import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider";
import { AuthContext } from "./context/AuthContext";
import ThemeController from "./components/ThemeController";
const Register=lazy(()=> import("./pages/Register"));
const Home=lazy(()=> import("./pages/Home"));
const Login=lazy(()=> import("./pages/Login"));
const CreatePost=lazy(()=> import("./pages/CreatePost"));
const EditPost=lazy(()=> import("./pages/EditPost"));
const PostDetail=lazy(()=> import("./pages/PostDetail"));
const Navbar=lazy(()=> import("./components/Navbar"));


const ProtectedRoute = ({ children }) => {

  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const { isDarkMode } = useContext(AuthContext);
  return (
    <AuthProvider>
      <ThemeController/>
      <BrowserRouter>
      <Suspense fallback={<div className="text-center my-5">Loading page…</div>}>
        <Navbar/>
        <main className={`container pt-5 ${isDarkMode ? "text-white" : ""}`}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="*" element={<p className="text-center mt-5">Page not found</p>} />
          </Routes>
        </main>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored" 
      />
      </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
