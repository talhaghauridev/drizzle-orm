import "dotenv/config";
import { PORT } from "./constants";
import app from "./app";

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Server is running",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ths http://localhost:${PORT}`);
});
