import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide ticket title"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    project: {
      type: String,
      ref: "Project",
      required: [true, "Please provide project"],
    },
    ticketType: {
      type: String,
      enum: ["security", "accident", "administrative", "logistic"],
      default: "administrative",
    },
    assignee: {
      type: String,
    },
    priority: {
      type: String,
      required: true,
      enum: ["high", "medium", "low"],
      default: "low",
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "close", "archived"],
      default: "open",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
