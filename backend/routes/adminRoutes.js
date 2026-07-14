const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getUsers,
  getPosts,
  deleteUser,
  deletePost,
} = require("../controllers/adminController");

router.get("/users", protect, admin, getUsers);

router.get("/posts", protect, admin, getPosts);

router.delete("/users/:id", protect, admin, deleteUser);

router.delete("/posts/:id", protect, admin, deletePost);

module.exports = router;