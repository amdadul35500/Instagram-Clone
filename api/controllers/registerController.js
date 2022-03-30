const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userObject = {
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    };

    const newUser = new User(userObject);
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).send("There was a server problem!");
  }
};

module.exports = {
  register,
};
