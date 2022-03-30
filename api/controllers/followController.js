const User = require("./../models/User");

const follow = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      const findFriend = await User.findById(req.params.id);
      const me = await User.findById(req.body.userId);

      if (!findFriend.followers.includes(req.body.userId)) {
        await findFriend.updateOne({
          $push: { followers: req.body.userId },
        });
        await me.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("user has been followed");
      } else {
        res.status(403).send("you allready follow this user!");
      }
    } else {
      res.status(404).send("You con't follow yourself!");
    }
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  follow,
};
