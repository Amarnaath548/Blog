const express = require("express");
const commentRouter = express.Router();
const commentController = require("../countrollers/commentController.js");
const auth=require('../middlewares/authMiddlewares.js');

commentRouter.post("/:blogId", auth, commentController.addComment);

commentRouter.get("/:blogId", commentController.getComments);

commentRouter.delete("/:commentId", auth, commentController.deleteComment);

module.exports = commentRouter;