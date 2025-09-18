import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/blog/${id}`).then((res) => {
      setPost(res.data);
      
    });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await API.delete(`/blog/${id}`);
      navigate("/");
    }
  };

  if (!post) return <p className="text-center mt-4">Loading post...</p>;
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm rounded">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="card-img-top rounded"
              loading="lazy"
            />
          )}
           <div className="card-body">
            <h2 className="card-title mb-3">{post.title}</h2>
            <p className="text-muted mb-2">
              By {post.author?.username || "Unknown"} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="card-text" style={{ whiteSpace: "pre-line", textAlign: "justify" }}>
              {post.content}
            </p>
            {user && user.id === post.author?._id && (
              <div className="d-flex gap-2 mt-3">
                <Link to={`/edit/${post._id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
