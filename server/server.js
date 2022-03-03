import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors"; //for try-catch block errors handling

// import routers
import ticketRouter from "./routes/ticketRoute.js";
import userRouter from "./routes/userRoute.js";

// import custom middlewares
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

// models
// import User from "./models/user.js";
// import Ticket from "./models/ticket.js";
// import Project from "./models/project.js";

app.get("/", (req, res) => {
  // throw new Error("error");
  res.send("Welcome!");
});

// test route
app.get("/backend", (req, res) => {
  res.json({ message: "hello from backend" });
});

// middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// use routers
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
// app.use("./api/projects", require("./controllers/projectController"));

// additional middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// db config
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// db connect
mongoose.connect(
  mongoURI,
  {
    useUnifiedTopology: true,
  },
  () => {
    console.log("The connection with mongod is established");
  }
);

// db check error
db.on("connected", () => console.log("My database is connected"))
  .on("error", (err) => console.log(`Got error! ${err.message}`))
  .on("disconnected", () => console.log("My database is disconnected"));

// listen
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
