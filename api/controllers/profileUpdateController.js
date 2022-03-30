const User = require("./../models/User");

const profileUpdate = async (req, res, next) => {
  try {
    const findUser = await User.findByIdAndUpdate(req.params.id, {
      $set: { profilePicture: req.filename },
    });

    console.log(findUser);

    if (findUser) {
      res.status(200).json(findUser);
    }
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  profileUpdate,
};
