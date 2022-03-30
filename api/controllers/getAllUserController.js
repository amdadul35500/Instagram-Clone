const User = require("./../models/User");

const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  getAllUser,
};
