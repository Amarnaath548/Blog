import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import AddComments from "../components/AddComments";
import CommentsController from "../components/CommentsController";

const PostDetail = () => {
  const {isDarkMode}=useContext(AuthContext)


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

  if (!post) return <p className="text-center mt-5 fs-4 text-primary">Loading post...</p>;

 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`container py-5 ${isDarkMode?"bg-dark":"bg-light"}`}>
      <div className="row justify-content-center">
        
        <div className="col-12 col-lg-10">
          <article className={`card shadow-lg border-0 ${isDarkMode ? "bg-dark text-white" : ""}`}>
           
            {post.image && (
              <div className="text-center p-3 p-md-5 rounded-top">
                <img
                  src={post.image}
                  alt={post.title}
                  className="img-fluid rounded-3"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            )}

            <div className="card-body p-4 p-md-5">
              
              <h1 className={`card-title ${isDarkMode ? "text-white" : "text-dark"}`}>
                {post.title}
              </h1>

              
              <p className="text-secondary mb-4 fs-6 border-bottom pb-3">
                <i className="bi bi-person-circle me-1"></i> By **{post.author?.username || "Unknown"}**
                <i className="bi bi-dot mx-2"></i>
                <i className="bi bi-calendar-check me-1"></i> {formatDate(post.createdAt)}
              </p>

             
              <div className="post-content">
                <p
                  className="card-text lead"
                  style={{ whiteSpace: "pre-line", textAlign: "justify" }}
                >
                  {post.content}
                </p>
              </div>

              
              {user && user.id === post.author?._id && (
                <div className="d-flex flex-column flex-sm-row gap-3 mt-5 pt-3 border-top">
                  <Link
                    to={`/edit/${post._id}`}
                    className="btn btn-warning btn-lg flex-grow-1"
                  >
                    <i className="bi bi-pencil-square me-2"></i>Edit Post
                  </Link>
                  <button
                    className="btn btn-danger btn-lg flex-grow-1"
                    onClick={handleDelete}
                  >
                    <i className="bi bi-trash-fill me-2"></i>Delete Post
                  </button>
                </div>
              )}
            </div>
          </article>
          <AddComments id={id}/>
          <CommentsController id={id}/>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;