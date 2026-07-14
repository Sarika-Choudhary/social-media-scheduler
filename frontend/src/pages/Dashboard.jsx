import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import PostCard from "../components/PostCard";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await API.get("/posts");
      setPosts(response.data);
    } catch (error) {
      alert("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      fetchPosts();
    } catch (error) {
      alert("Error deleting post");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/create")}
        >
          Create New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p>No Posts Available</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={deletePost}
            onEdit={(id) => navigate(`/edit/${id}`)}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;