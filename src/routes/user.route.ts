import express from "express";
import { allUsers, deleteUser, loginUser, registerUser, updateUser } from "../controllers/user.controller";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(allUsers)
router.route("/:id").patch(updateUser).delete(deleteUser)

export default router;
