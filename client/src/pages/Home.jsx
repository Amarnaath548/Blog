import React, { useEffect, useState, useCallback, useMemo, useContext } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const getPaginationItems = (totalPages, currPage) => {
    const items = [];
    const boundarySize = 3;
    const centerCutoff = boundarySize + 1;

    if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
            items.push(i);
        }
    } else if (currPage <= centerCutoff) {
       
        for (let i = 1; i <= boundarySize + 1; i++) {
            items.push(i);
        }
        items.push("...");
        items.push(totalPages - 1);
        items.push(totalPages);
    } else if (currPage > totalPages - centerCutoff) {
        
        items.push(1);
        items.push(2);
        items.push("...");
        for (let i = totalPages - boundarySize; i <= totalPages; i++) {
            items.push(i);
        }
    } else {
        
        items.push(1);
        items.push(2);
        items.push("...");
        for (let i = currPage - 1; i <= currPage + 1; i++) {
            items.push(i);
        }
        items.push("...");
        items.push(totalPages - 1);
        items.push(totalPages);
    }
   
    return Array.from(new Set(items)).filter(item => item !== '...' || items.indexOf(item) === items.lastIndexOf('...'));
};


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const {isDarkMode}=useContext(AuthContext)

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [totalPages]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await API.get(`/blog?page=${currPage}`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again later.");
        setPosts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currPage]);

  
  const paginationItems = useMemo(() => 
    getPaginationItems(totalPages, currPage)
  , [totalPages, currPage]);


  return (
    <>
      <div className={`row `}>
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center my-5" role="alert">
            {error}
          </div>
        ) : posts.length === 0 && totalPages > 0 ? (
           <div className="text-center my-5">No posts found on this page.</div>
        ) : (
          posts.map((post) => (
            <div
              className="col-md-4 mb-4"
              key={post._id}
              onClick={() => {
                navigate(`/post/${post._id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className={`card shadow-sm h-100 rounded ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}>
                {post.image && (
                  <img
                    className="card-img-top rounded"
                    src={post.image.replace("/upload/", "/upload/f_auto,q_auto/")}
                    alt={post.title}
                    loading="lazy"
                    style={{ height: "200px", objectFit: "cover" }}
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
          ))
        )}
      </div>
      
      
     {totalPages > 1 && !loading && (
    <div className="d-flex justify-content-center my-4">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          
          
          <li className={`page-item ${currPage === 1 ? "disabled" : ""}`}>
            <button
              className={`page-link ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
              onClick={() => handlePageChange(currPage - 1)}
              disabled={currPage === 1}
              aria-label="Previous"
            >
              Previous
            </button>
          </li>

          
          {paginationItems.map((item, index) =>
            item === "..." ? (
              <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className={`page-link ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}>...</span>
              </li>
            ) : (
              <li
                key={item}
                
                className={`page-item ${item === currPage ? "active" : ""} ${isDarkMode ? "border-secondary" : ""}`}
              >
                <button
                 
                  className={`page-link ${isDarkMode && item !== currPage ? "bg-dark text-white border-secondary" : ""}`}
                  onClick={() => handlePageChange(item)}
                  aria-current={item === currPage ? "page" : undefined}
                >
                  {item}
                </button>
              </li>
            )
          )}

         
          <li
            className={`page-item ${
              currPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className={`page-link ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
              onClick={() => handlePageChange(currPage + 1)}
              disabled={currPage === totalPages}
              aria-label="Next"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )}
    </>
  );
};

export default Home;