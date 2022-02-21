import Ticket from "../models/ticket.js";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
// import moment from "moment";

const createTicket = async (req, res) => {
  const { title, description, priority, project } = req.body;
  if (!title || !description || !priority || !project) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.params.userId });
  if (user.usertype === "admin") {
    const inputField = {
      ...req.body,
      createdBy: req.params.userId,
    };
    const ticket = await Ticket.create(inputField);
    res.status(StatusCodes.CREATED).json({ ticket });
  } else {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
};

const getAllTickets = async (req, res) => {
  const { status, ticketType, sort } = req.query;

  const queryObject = {
    createdBy: "621340f8527b527aa34cb771",
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (ticketType && ticketType !== "all") {
    queryObject.ticketType = ticketType;
  }

  // NO AWAIT
  let result = Ticket.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const tickets = await result;

  const totalTickets = await Ticket.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTickets / limit);

  res.status(StatusCodes.OK).json({ tickets, totalTickets, numOfPages });
};

const getTicket = async (req, res) => {
  res.send("one ticket");
};

const updateTicket = async (req, res) => {
  res.send("update ticket");
};

const deleteTicket = async (req, res) => {
  res.send("delete ticket");
};

export { createTicket, getAllTickets, getTicket, updateTicket, deleteTicket };
