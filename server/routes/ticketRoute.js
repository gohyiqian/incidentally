import express from "express";
const router = express.Router();

import {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

router.route("/").post(createTicket).get(getAllTickets);
router.route("/:id").get(getTicket).delete(deleteTicket).patch(updateTicket);

export default router;
