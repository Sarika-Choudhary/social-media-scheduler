const adminRoutes = require("./routes/adminRoutes");
const startScheduler = require("./cron/postScheduler");
const path = require("path");
const postRoutes = require("./routes/postRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

connectDB();
startScheduler();
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Social Media Scheduler Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});