const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    media: {
      type: String,
      required: true,
    },

    platforms: [
      {
        type: String,
        enum: ["facebook", "instagram"],
      },
    ],

    scheduledAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "published", "failed"],
      default: "scheduled",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);