import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const navigate=useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
 const data=new FormData();
    data.append("title",form.title);
    data.append("content",form.content);
    if(form.image) data.append("image",form.image)
    await API.post('/blog',data);
    navigate('/')
    }finally{
      setLoading(false);
      toast.success("Published successfully", {
      className: "bg-success text-white",
      bodyClassName: "fs-6",
      progressClassName: "bg-light"  
    });
    }
   
  };

  if (!user) return <p className="text-center mt-4">Login to create posts</p>;
  if(loading) return <p className="text-center mt-4">Publishing...</p>
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow p-4">
          <h3>Create post</h3>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea id="content"
                className="form-control"
                rows="5"
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image">Image</label>
              <input type="file" accept="image/*" onChange={(e)=>setForm({...form,image:e.target.files[0]})} className="form-control"  id="image" />
            </div>
            <button className="btn btn-success" type="submit">Publish</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
