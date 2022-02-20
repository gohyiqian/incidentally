import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    project: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    prority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
