import User from "../models/user.js";
// import { requireAuth } from "../middleware/auth";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

// create user
const userRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  // const usertype = "admin";
  const usertype = "normal";
  const user = await User.create({ username, email, password, usertype });
  console.log(user._id);
  const token = user.createJWT();
  // exclude password from the json response
  res.status(StatusCodes.OK).json({
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

// user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

// admin - get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({ users });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST);
  }
  res.send("all users");
};

// admin - get a user
const getUser = async (req, res) => {
  res.send("one user");
};

// admin - update user
const updateUser = async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) {
    throw new BadRequestError("Please provide all values");
  }
  const updatedField = {
    username: username,
    email: email,
  };
  const user = await User.findOneAndUpdate(
    { _id: req.params.userId },
    updatedField
  );
  // const user = await User.findOne({ _id: "62133436309145a5f361aaf8" });

  await user.save();
  const token = user.createJWT();
  console.log(token);
  res.status(StatusCodes.OK).json({ user, token });
};

// admin - delete user
const deleteUser = async (req, res) => {
  res.send("delete user");
};

// user logout
export {
  userRegister,
  userLogin,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
