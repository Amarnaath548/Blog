import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { toast } from "react-toastify";

export default function EditPost() {
  const { id } = useParams();
  const [updating,setUpdating]=useState(false)
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/blog/${id}`).then((res) => {
      setForm({ title: res.data.title, content: res.data.content, image: null });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    if (form.image) data.append("image", form.image);

    await API.post(`/blog/${id}`, data);
    setUpdating(false)
    toast.success('Post updated successfully')
    navigate(`/post/${id}`);
    } catch (error) {
      setUpdating(false);
      toast.error(error.response?.data?.mess || "Error ,Please try agian");
    }
    
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow p-4">
          <h3 className="mb-3">Edit Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows="6"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Replace Image (optional)</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              />
            </div>
            {updating?(
              <p className="text-info">Updating please wait</p>
            ):(
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
