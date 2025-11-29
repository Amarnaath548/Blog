import React, { useContext, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const { isDarkMode } = useContext(AuthContext);
  const navigate = useNavigate();

 
  const formControlClass = isDarkMode
    ? "form-control bg-secondary text-white border-light"
    : "form-control";

  const cardBodyClass = isDarkMode
    ? "card-body p-4 bg-dark text-white"
    : "card-body p-4";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      if (form.image) data.append("image", form.image);
      await API.post("/blog", data);
      toast.success("Published successfully", {
        className: "bg-success text-white",
        bodyClassName: "fs-6",
        progressClassName: "bg-light",
      });
      navigate("/");
    } catch (err) {
      console.error("Error publishing post:", err);
      toast.error("Failed to publish post. Please try again.", {
        className: "bg-danger text-white",
        bodyClassName: "fs-6",
        progressClassName: "bg-light",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-4">Login to create posts</p>;
  if (loading) return <p className="text-center mt-4">Publishing...</p>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div
          className={`card shadow-lg border-0 ${
            isDarkMode ? "bg-dark text-white" : ""
          }`}
        >
          <div className={cardBodyClass}>
            {" "}
           
            <h3 className="card-title mb-4">Create post</h3>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className={formControlClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  id="content"
                  className={formControlClass}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
               
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.files[0] })
                  }
                  className={`form-control ${
                    isDarkMode ? "text-white border-light" : ""
                  }`}
                  id="image"
                />
              </div>
              <button className="btn btn-success" type="submit">
                Publish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
