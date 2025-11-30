import { useContext, useEffect, useState } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import CommentsPresenter from "./CommentsPresenter";

const CommentsController = ({ id }) => {
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await API.get(`/comments/${id}`);
        setComments(data.comments);
        console.log(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  const handleDelete = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <CommentsPresenter
      comments={comments}
      user={user}
      handleDelete={handleDelete}
    />
  );
};

export default CommentsController;
