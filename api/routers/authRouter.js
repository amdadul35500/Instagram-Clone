const router = require("express").Router();
const { register } = require("../controllers/registerController");
const { login, logout } = require("../controllers/loginController");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/userValidator");

// Register
router.post("/register", addUserValidators, addUserValidationHandler, register);

// Login
router.post("/login", login);

// logout
router.delete("/logout", logout);

module.exports = router;
