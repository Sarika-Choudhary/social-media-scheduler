const cron = require("node-cron");
const Post = require("../models/Post");

const startScheduler = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking scheduled posts...");

    try {
      const now = new Date();

      const posts = await Post.find({
        status: "scheduled",
        scheduledAt: { $lte: now },
      });

      for (const post of posts) {
        post.status = "published";
        await post.save();

        console.log(`Published: ${post.title}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  });
};

module.exports = startScheduler;