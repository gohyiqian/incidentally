import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import {
  createTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

router.route("/").post(authenticateUser, createTicket);
router.route("/").get(authenticateUser, getAllTickets);
router
  .route("/:id")
  .delete(authenticateUser, deleteTicket)
  .patch(authenticateUser, updateTicket);

export default router;
