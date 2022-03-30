const User = require("./../models/User");

const checkFollowUnFollow = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const findFriend = await User.findById(req.params.id);
      const me = await User.findById(req.body.userId);
      if (findFriend.followers.includes(req.body.userId)) {
        res.status(200).send("Followed");
      } else {
        res.status(200).send("Unfollowed");
      }
    } else {
      console.log("2");
      res.status(500).send("You can't followed yourself!");
    }
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  checkFollowUnFollow,
};
