const User = require("./../models/User");

const getUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    const { password, updatedAt, ...other } = user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Inernal Server Error!");
  }
};

module.exports = {
  getUser,
};
