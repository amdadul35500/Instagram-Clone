const Comments = require("./../models/Comments");

const comment = async (req, res, next) => {
  try {
    const userComment = {
      userId: req.body.userId,
      postId: req.params.id,
      comment: req.body.comment,
    };

    const saveComment = new Comments(userComment);
    const response = await saveComment.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  comment,
};
