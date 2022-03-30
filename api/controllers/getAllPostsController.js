const Post = require("./../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ userId: req.params.id });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).send("Internal serer error!");
  }
};

module.exports = {
  getAllPosts,
};
