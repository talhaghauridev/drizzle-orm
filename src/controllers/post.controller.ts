import { ilike } from "drizzle-orm";
import { db } from "../db";
import { posts } from "../drizzle/schema";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import PostService from "../services/post.service";

const allPosts = asyncHandler(async (req, res, next) => {
  const { name, page = 1, limit = 4 } = req.query;
  const skip = Number((limit as number) * ((page as number) - 1));

  const allPosts = await db.query.posts.findMany({
    limit: Number(limit),
    offset: skip,
    where: name ? ilike(posts.id, `%${name}%`) : undefined,
    with: {
      comments: true,
    },
  });

  res.status(200).json(new ApiResponse(200, allPosts));
});

const createPost = asyncHandler(async (req, res, next) => {
  const { userId, content, title } = req.body;

  if (!userId || !content || !title) {
    return next(new ApiError(400, "Please fill all fields"));
  }
  const post = await PostService.createPost({ title, userId });

  if (!post) {
    return next(new ApiError(400, "Post created error"));
  }
  res.status(200).json(new ApiResponse(200, {}, "Post created successfully"));
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { content, title } = req.body;
  const id = req.params.id;
  if (!content || !title) {
    return next(new ApiError(400, "Please fill all fields"));
  }
  const post = await PostService.updateOne({ title, id });

  if (!post) {
    return next(new ApiError(500, "Post update error"));
  }
  res.status(200).json(new ApiResponse(200, {}, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ApiError(400, "Please provide post id"));
  }

  const post = await PostService.deleteOne(id);

  if (!post) {
    return next(new ApiError(400, "Delete post error"));
  }
  res.status(200).json(new ApiResponse(200, {}, "Delete post successfullly"));
});

export { allPosts, createPost, updatePost, deletePost };
