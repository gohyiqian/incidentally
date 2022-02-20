import express from "express";
const router = express.Router();

import {
  userRegister,
  userLogin,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/all").get(getAllUsers);
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

export default router;
