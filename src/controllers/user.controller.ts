import { and, eq, ilike } from "drizzle-orm";
import { db } from "../db";
import { users } from "../drizzle/schema";
import UserService from "../services/user.service";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ApiError(400, "Please fill all fields"));
  }
  const existingUser = await UserService.findEmail(email);

  if (existingUser) {
    return next(new ApiError(400, "User is already exist"));
  }

  const user = await UserService.createUser({ email, name, password });

  if (!user) {
    return next(new ApiError(400, "User created error"));
  }
  res.status(200).json(new ApiResponse(200, user));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(400, "Please fill all fields"));
  }
  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email), eq(users.password, password)),
  });

  if (!user) {
    return next(new ApiError(400, "Invalid crententials"));
  }

  res.status(200).json(new ApiResponse(200, user));
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  if (!email || !password || !name) {
    return next(new ApiError(400, "Please fill all fields"));
  }
  const loggedUser = await UserService.findById(id);

  if (!loggedUser) {
    return next(new ApiError(400, "Invalid user"));
  }
  const user = await UserService.updateOne({ name, email, password, id });
  if (!user) {
    return next(new ApiError(400, "User updated error"));
  }
  res.status(200).json(new ApiResponse(200, {}, "Update user successfully"));
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ApiError(400, "Please provide id"));
  }
  const user = await UserService.deleteOne(id);

  if (!user) {
    return next(new ApiError(400, "User delete error"));
  }

  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

const allUsers = asyncHandler(async (req, res, next) => {
  const { name, page = 1, limit = 5 } = req.query;

  const offset = Number(limit) * (Number(page) - 1);

  try {
    const allusers = await db.query.users.findMany({
      with: {
        posts: true,
      },
      limit: Number(limit),
      offset,
      where: name ? ilike(users.name, `%${name}%`) : undefined,
    });

    res.status(200).json(new ApiResponse(200, allusers));
  } catch (error) {
    next(error);
  }
});
export { registerUser, loginUser, allUsers, updateUser, deleteUser };
