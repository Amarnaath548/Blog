import React, { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const AddComments = ({ id }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { isDarkMode, user } = useContext(AuthContext);

  if (!user) {
    return (
      <div
        className={`card mt-4 p-3 shadow-sm ${
          isDarkMode ? "bg-secondary text-white" : "bg-light"
        }`}
      >
        <p className="mb-0">Please **log in** to post a comment.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      setError("Comment content cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const { data } = await API.post(`/comments/${id}`, { content });
      console.log("Comment added:", data);

      // Clear the textarea and show success
      setContent("");
      setSuccess(true);
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`card mt-4 shadow-sm ${
        isDarkMode ? "bg-dark border-secondary text-white" : "bg-white"
      }`}
    >
      <div
        className={`card-header ${
          isDarkMode
            ? "bg-secondary border-secondary text-white"
            : "bg-primary text-white"
        }`}
      >
        <h5 className="mb-0">Leave a Comment</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className={`form-control ${
                isDarkMode ? "bg-dark text-white border-secondary" : ""
              }`}
              id="commentContent"
              rows="3"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
                setSuccess(false);
              }}
              placeholder="Type your comment here..."
              disabled={isSubmitting}
            ></textarea>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {success && (
            <div className="alert alert-success">
              Comment added successfully!
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || content.trim() === ""}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Submitting...
              </>
            ) : (
              "Submit Comment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComments;
