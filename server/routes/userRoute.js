import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

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
router
  .route("/:userId")
  .get(getUser)
  .delete(deleteUser)
  .patch(authenticateUser, updateUser);

export default router;
