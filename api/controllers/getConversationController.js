const Conversation = require("./../models/Conversation");

const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getConversation,
};
