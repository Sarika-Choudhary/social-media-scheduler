import { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      alert("Error loading users");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await API.get("/admin/posts");
      setPosts(res.data);
    } catch (error) {
      alert("Error loading posts");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert("Error deleting user");
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await API.delete(`/admin/posts/${id}`);
      fetchPosts();
    } catch (error) {
      alert("Error deleting post");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <hr />

      <h3>Users</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h3>Posts</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.status}</td>
              <td>{post.createdBy?.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;