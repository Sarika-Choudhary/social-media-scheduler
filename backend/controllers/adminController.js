const User = require("../models/User");
const Post = require("../models/Post");

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "createdBy",
      "name email"
    );

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getPosts,
  deleteUser,
  deletePost,
};