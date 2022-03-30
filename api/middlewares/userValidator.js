const { check, validationResult } = require("express-validator");
const User = require("./../models/User");

const addUserValidators = [
  check("userName")
    .isLength({ min: 1 })
    .withMessage("Name is requred!")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email already is use!");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    console.log(mappedErrors);
    res.status(500).send(mappedErrors);
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
