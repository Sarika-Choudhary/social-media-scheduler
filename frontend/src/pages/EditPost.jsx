import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platforms: "",
    scheduledAt: "",
  });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await API.get(`/posts/${id}`);

      setFormData({
        title: response.data.title,
        description: response.data.description,
        platforms: response.data.platforms[0],
        scheduledAt: response.data.scheduledAt.slice(0, 16),
      });
    } catch (error) {
      alert("Unable to load post");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/posts/${id}`, {
        ...formData,
        platforms: [formData.platforms],
      });

      alert("Post Updated Successfully");

      navigate("/dashboard");
    } catch (error) {
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          className="form-control mb-3"
          name="platforms"
          value={formData.platforms}
          onChange={handleChange}
        >
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
        </select>

        <input
          type="datetime-local"
          className="form-control mb-3"
          name="scheduledAt"
          value={formData.scheduledAt}
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;