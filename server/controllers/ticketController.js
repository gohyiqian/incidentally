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
  req.body.createdBy = req.user.userId;
  const ticket = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ ticket });

  // const user = await User.findOne({ _id: req.params.userId });
  // if (user.usertype === "admin") {
  //   const inputField = {
  //     ...req.body,
  //     createdBy: req.params.userId,
  //   };
  //   const ticket = await Ticket.create(inputField);
  //   res.status(StatusCodes.CREATED).json({ ticket });
  // }
  // else {
  //   throw new UnAuthenticatedError("Invalid Credentials");
  // }
};

const getAllTickets = async (req, res) => {
  // const tickets = await Ticket.find({ createdBy: req.user.userId });
  // res
  //   .status(StatusCodes.OK)
  //   .json({ tickets, totalTickets: tickets.length, numOfPages: 1 });
  const { status, ticketType, sort, priority } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (priority && priority !== "all") {
    queryObject.priority = priority;
  }

  if (ticketType && ticketType !== "all") {
    queryObject.ticketType = ticketType;
  }
  console.log(queryObject);
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
  console.log(result);
  // // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const tickets = await result;
  const totalTickets = await Ticket.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTickets / limit);

  res.status(StatusCodes.OK).json({ tickets, totalTickets, numOfPages });
};

const updateTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    throw new BadRequestError("Please provide all values");
  }
  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new NotFoundError(`No Ticket with id :${ticketId}`);
  }

  checkPermissions(req.user, ticket.createdBy);

  const updatedTicket = await Ticket.findOneAndUpdate(
    { _id: ticketId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedTicket });
};

const deleteTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new NotFoundError(`No job with id :${ticketId}`);
  }

  checkPermissions(req.user, ticket.createdBy);

  await ticket.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Ticket is removed" });
};

export { createTicket, getAllTickets, updateTicket, deleteTicket };
