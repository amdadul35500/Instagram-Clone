const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cd) => {
    cd(null, req.body.name);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File uploaded successfully!");
  } catch (error) {
    res.status(500).send("There was a server problem!");
  }
});

module.exports = router;
