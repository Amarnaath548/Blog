import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    API.get("/blog").then((res) =>setPosts(res.data) );
    
  }, []);

  
  return (
    <div className="row">
      {posts.map((post) => (
        <div className="col-md-4 mb-4" key={post._id} onClick={()=>{navigate(`/post/${post._id}`)}} style={{ cursor: "pointer" }}>
          <div className="card shadow-sm h-100">
            {post.image && (
              <img
                className="card-img-top"
                src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
                alt={post.title}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">
                {post.content.length > 100
                  ? post.content.substring(0, 100) + "..."
                  : post.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
