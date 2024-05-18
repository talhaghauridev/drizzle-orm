import express from "express";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller";

const router = express.Router();

router.route("/create").post(createComment);
router.route("/:id").patch(updateComment).delete(deleteComment);

export default router;
