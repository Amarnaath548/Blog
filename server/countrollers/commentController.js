const Comment = require("../model/Comment.js");
const Blog = require("../model/Blog.js");
const User = require("../model/User.js");

// Add a comment to a blog post
const addComment = async (req, res) => {
  try {
    const {content } = req.body;
    console.log("Content:", content);
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }


    const userId = req.user.id;

    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const newComment = new Comment({ blogId, userId, content });
    await newComment.save();
    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Error adding comment:", error);
  }
};

// Get comments for a specific blog post
const getComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blogId }).populate("userId", "username").limit(10)
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Error fetching comments:", error);
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Error deleting comment:", error);
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const { content } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Error updating comment:", error);
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
  updateComment,
};

