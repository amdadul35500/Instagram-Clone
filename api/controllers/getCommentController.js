const Comments = require("./../models/Comments");

const getComment = async (req, res, next) => {
  console.log("hello");
  try {
    const allComment = await Comments.find({ postId: req.params.Id });
    res.status(200).json(allComment);
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  getComment,
};
