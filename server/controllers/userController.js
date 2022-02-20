// import express from "express";
// import { Jwt } from "jsonwebtoken";
// import bcrypt from "bcrypt";
import User from "../models/user.js";
// import { requireAuth } from "../middleware/auth";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

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
  const user = await User.create(req.body);
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
  res.send("login user");
};

// admin - get all users
const getAllUsers = async (req, res) => {
  res.send("all users");
};

// admin - get a user
const getUser = async (req, res) => {
  res.send("one user");
};

// admin - update user
const updateUser = async (req, res) => {
  res.send("update user");
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
