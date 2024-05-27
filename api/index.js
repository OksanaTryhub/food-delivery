import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

dotenv.config();
const { PORT } = process.env;

connectDB();
const app = express();
const port = PORT || 3000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use("/images", express.static(path.join(__dirname, "api", "uploads")));
app.use("/admin", express.static(path.join(__dirname, "/admin/dist")));
app.use("/", express.static(path.join(__dirname, "/client/dist")));

app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "dist", "index.html"));
});

app.get("*", (req, res) => {
  const url = req.url;
  if (url.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "admin", "dist", "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
