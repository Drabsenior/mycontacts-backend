const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc POST create user
//@route POST /api/user/
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatroy");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("Email already exists");
  }

  //hased password
  const hashedpassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedpassword,
  });
  if (user) {
    res.status(201).json({ message: "user is created", data: user });
  } else {
    res.status(400);
    throw new Error("User data not valid ");
  }
});
//@desc POST login user
//@route POST /api/user/
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });

  const comparedPassword = await bcrypt.compare(password, user.password);
  if (user && comparedPassword) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Email or password not valid");
  }
});
//@desc POST create user
//@route POST /api/user/
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res
    .status(201)
    .json({ message: "Current  user information", data: req.user });
});

module.exports = { registerUser, loginUser, currentUser };
