const upload = require("../config/multer");
const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  upload.single("media"),
  createPost
);

router.get("/", protect, getPosts);

router.get("/:id", protect, getPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

module.exports = router;