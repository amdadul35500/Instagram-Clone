const router = require("express").Router();
const multer = require("multer");
const { profileUpdate } = require("../controllers/profileUpdateController");
const { follow } = require("../controllers/followController");
const { unfollow } = require("../controllers/unfollowController");
const { getPost } = require("../controllers/getPostController");
const { getUser } = require("../controllers/getUserController");
const { getAllUser } = require("../controllers/getAllUserController");
const {
  checkFollowUnFollow,
} = require("../controllers/checkFollowUnFolloController");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/profilePicture");
  },
  filename: (req, file, cd) => {
    cd(null, req.body.name);
    req.filename = req.body.name;
  },
});

const upload = multer({ storage });

// get post
router.get("/timeline/:userId", getPost);

// get a user
router.get("/", getUser);

// get all user
router.get("/all", getAllUser);

// update profile picture
router.put("/update/:id", upload.single("file"), profileUpdate);

// follow a user
router.put("/:id/follow", follow);

// unfollow a user
router.put("/:id/unfollow", unfollow);

//checkFollowUnFollo
router.post("/:id/checkFollowUnFollow", checkFollowUnFollow);

module.exports = router;
