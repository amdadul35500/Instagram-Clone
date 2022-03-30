const router = require("express").Router();
const Post = require("../models/Post");
const { likeUnlike } = require("../controllers/likeUnlikeController");
const { comment } = require("../controllers/commentController");
const { getComment } = require("../controllers/getCommentController");
const { getAllPosts } = require("../controllers/getAllPostsController");

// create post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePOst = await newPost.save();
    res.status(200).json(savePOst);
  } catch (error) {
    res.status(200).send(error);
  }
});

// like/dislike a post
router.put("/:id/like", likeUnlike);

// comment a post
router.post("/:id/comment", comment);

// get comment
router.get("/:Id", getComment);

// get all photo
router.get("/:id/allposts", getAllPosts);

module.exports = router;
