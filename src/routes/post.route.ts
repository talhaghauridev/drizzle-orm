import express from "express";
import {
  allPosts,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/post.controller";

const router = express.Router();

router.route("/create").post(createPost);
router.route("/").get(allPosts);
router.route("/:id").patch(updatePost).delete(deletePost);

export default router;
