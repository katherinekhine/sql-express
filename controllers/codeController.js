const Post = require("../models/postModel");
const User = require("../models/userModel");
const multer = require("multer");
const path = require("path"); // Add this to handle file extension

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (_req, file, cb) => {
    cb(
      null,
      file.filename + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("photo");

exports.index = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render("posts/list", { posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Server Error");
  }
};
