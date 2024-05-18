import CommentService from "../services/comment.service";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const createComment = asyncHandler(async (req, res, next) => {
  const { postId, comment, userId } = req.body;

  if (!comment || !userId || !postId) {
    return next(new ApiError(400, "Please fill all fields"));
  }

  const newComment = await CommentService.createComment({
    comment,
    postId,
    userId,
  });

  if (!newComment) {
    return next(new ApiError(400, "Comment created error"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment created successfully"));
});

const updateComment = asyncHandler(async (req, res, next) => {
  const { comment } = req.body;
  const id = req.params.id;
  if (!comment || !id) {
    return next(new ApiError(400, "Please fill all fields"));
  }
  const updateComment = await CommentService.updateOne({
    comment,
    id,
  });

  if (!updateComment) {
    return next(new ApiError(500, "Comment updated error"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ApiError(400, "Please provide comment id"));
  }

  const comment = await CommentService.deleteOne(id)
  if (!comment) {
    return next(new ApiError(400, "Delete comment error"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Delete comment successfullly"));
});

export { createComment, updateComment, deleteComment };
