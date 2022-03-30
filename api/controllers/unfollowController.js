const User = require("./../models/User");

const unfollow = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      const findFriend = await User.findById(req.params.id);
      const me = await User.findById(req.body.userId);

      if (findFriend.followers.includes(req.body.userId)) {
        await findFriend.updateOne({
          $pull: { followers: req.body.userId },
        });
        await me.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).send("user has been unfollowed");
      } else {
        res.status(403).send("you don't follow this user!");
      }
    } else {
      res.status(404).send("You can't follow yourself!");
    }
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  unfollow,
};
