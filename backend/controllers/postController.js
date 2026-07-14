const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      platforms,
      scheduledAt,
    } = req.body;

    const post = await Post.create({
      title,
      description,
      media: req.file ? req.file.filename : "",
      platforms,
      scheduledAt,
      createdBy: req.user._id,
    });

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      createdBy: req.user._id,
    });

    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};