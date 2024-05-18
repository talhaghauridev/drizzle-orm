import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import ApiError from "./utils/ApiError";
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", commentRoutes);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.statusCode).json({
    message: error.message,
    success: false,
    statusCode: error.statusCode,
  });
});
export default app;
