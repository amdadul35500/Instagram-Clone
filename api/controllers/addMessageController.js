const Message = require("./../models/Messages");

const addMessage = async (req, res, next) => {
  const message = new Message(req.body);

  global.io.emit("new_message", req.body);
  console.log("hello");

  try {
    const newMessage = await message.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  addMessage,
};
