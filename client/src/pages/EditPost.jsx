import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.js";

export default function EditPost() {
  const { id } = useParams();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [loading, setLoading] = useState(true);
  
  const { isDarkMode } = useContext(AuthContext); 

  
  const formControlClass = isDarkMode 
    ? "form-control bg-secondary text-white border-light" 
    : "form-control";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/blog/${id}`);
        
        setForm({ title: res.data.title, content: res.data.content, image: null });
      } catch (error) {
        console.error("error:", error);
        toast.error("Failed to load post for editing.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      
      if (form.image) data.append("image", form.image);

      
      await API.post(`/blog/${id}`, data);
      
      toast.success('Post updated successfully');
      navigate(`/post/${id}`);

    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.msg || "Error updating post. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        
        <div className={`card shadow p-4 ${isDarkMode ? "bg-dark text-white border-light" : ""}`}>
          
          <h3 className="mb-3">Edit Post</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className={formControlClass}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className={formControlClass} 
                rows="6"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Replace Image (optional)</label>
              <input
                type="file"
                
                className={`form-control ${isDarkMode ? "text-white border-light" : ""}`}
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              />
            </div>
            {updating ? (
              <p className={`text-info ${isDarkMode ? "text-light" : ""}`}>
                Updating, please wait...
              </p>
            ) : (
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}