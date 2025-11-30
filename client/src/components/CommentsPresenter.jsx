import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const CommentsPresenter = ({ comments, user, handleDelete }) => {
  const { isDarkMode } = useContext(AuthContext);

  return (
    <div className="mt-5">
      <h3 className={`mb-4 ${isDarkMode ? "text-white" : "text-dark"}`}>
        <i className="bi bi-chat-left-text me-2"></i>
        Comments ({comments.length})
      </h3>
      <hr className={isDarkMode ? "border-secondary" : ""} />

      {comments.length === 0 ? (
        <p className={isDarkMode ? "text-light" : "text-muted"}>
          Be the first to leave a comment!
        </p>
      ) : (
        <div className="list-group">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className={
                isDarkMode
                  ? "card mb-3 bg-secondary border-dark text-white shadow-sm"
                  : "card mb-3 bg-light shadow-sm"
              }
            >
              <div className="card-body">
                <p className="card-text">{comment.content}</p>

                <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
                  <small
                    className={`fw-lighter ${
                      isDarkMode ? "text-light" : "text-muted"
                    }`}
                  >
                    By: **{comment.userId?.username || "Guest"}**
                  </small>

                  {user && comment.userId?._id === user?._id && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="btn btn-sm btn-outline-danger ms-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsPresenter;
