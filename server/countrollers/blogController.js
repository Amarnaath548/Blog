const Blog = require("../model/Blog.js");

const createPost = async (req, res) => {
  try {
    const post =await Blog.create({
      title: req.body.title,
      content: req.body.content,
      image: req.file?req.file.path.replace(/\\/g, "/"):null,
      author: req.user.id,
    });
    res.json({ post });
  } catch (error) {
    res.status(500).json({ mess: error.message });
  }
};

const getPosts = async (req, res) => {
  const posts = await Blog.find()
    .populate("author", "username")
    .sort({ createdAt: -1 });
    
  res.json(posts);
};

const getPost = async (req, res) => {
  const post = await Blog.findById(req.params.id).populate(
    "author",
    "username"
  );
  if(!post) return res.status(400).json({message:"post not found"})
  res.json(post);
};

const updatePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ mess: "Not yours" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    if (req.file) post.image = req.file.path;
    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Blog.findById({_id:req.params.id});
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not yours" });
    await post.deleteOne();
    res.json({ mess: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "server error" });
  }
};


module.exports={createPost,getPosts,getPost,updatePost,deletePost}