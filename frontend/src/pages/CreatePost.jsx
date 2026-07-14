import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platforms: "",
    scheduledAt: "",
  });

  const [media, setMedia] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "media") {
      setMedia(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional frontend validation
    if (media && !media.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("platforms", formData.platforms);
    data.append("scheduledAt", formData.scheduledAt);

    if (media) {
      data.append("media", media);
    }

    try {
      await API.post("/posts", data);

      alert("Post Created Successfully");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <select
          name="platforms"
          className="form-control mb-3"
          onChange={handleChange}
          required
        >
          <option value="">Select Platform</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
        </select>

        <input
          type="datetime-local"
          name="scheduledAt"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="media"
          className="form-control mb-3"
          accept=".jpg,.jpeg,.png,image/*"
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;