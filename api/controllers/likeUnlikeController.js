const Post = require("./../models/Post");

const likeUnlike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: { likes: req.body.userId },
      });
      res.status(200).json("the post has been liked!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been unliked!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  likeUnlike,
};
