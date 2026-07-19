const BACKEND_URL = "https://social-media-scheduler-fe79.onrender.com";

const PostCard = ({ post, onDelete, onEdit }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {post.media && (
          <img
            src={`${BACKEND_URL}/uploads/${post.media}`}
            alt={post.title}
            className="img-fluid mb-3"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        <h4>{post.title}</h4>

        <p>{post.description}</p>

        <p>
          <strong>Platform:</strong>{" "}
          {Array.isArray(post.platforms)
            ? post.platforms.join(", ")
            : post.platforms}
        </p>

        <p>
          <strong>Status:</strong> {post.status}
        </p>

        <p>
          <strong>Scheduled:</strong>{" "}
          {new Date(post.scheduledAt).toLocaleString()}
        </p>

        <button
          className="btn btn-primary me-2"
          onClick={() => onEdit(post._id)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;