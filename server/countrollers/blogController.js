const { uploadImage } = require("../utils/upload.js");
const Blog = require("../model/Blog.js");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.file) return res.status(400).json({ msg: "Image is required" });

    const imageUrl = await uploadImage(req, res);

    const post = await Blog.create({
      title,
      content,
      image: imageUrl,
      author: req.user.id,
    });
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const posts = await Blog.find()
      .skip(skip)
      .limit(limit)
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .lean();

    const totalPosts = await Blog.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({ posts, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};


const getPost = async (req, res) => {
  const post = await Blog.findById(req.params.id).populate(
    "author",
    "username"
  );
  if (!post) return res.status(400).json({ message: "post not found" });
  res.json(post);
};

const updatePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not yours" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    if (req.file) post.image = await uploadImage(req, res);
    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Blog.findById({ _id: req.params.id });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not yours" });
    await post.deleteOne();
    res.json({ msg: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
