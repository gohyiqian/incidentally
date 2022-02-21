import express from "express";
const router = express.Router();

import {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

router.route("/:userId").post(createTicket);
router.route("/all").get(getAllTickets);
router
  .route("/:ticketId")
  .get(getTicket)
  .delete(deleteTicket)
  .patch(updateTicket);

export default router;
