import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";

connectDB();
const app = express();
const port = 3000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/api/food", foodRouter);
app.use("/images", express.static(path.join(__dirname, "api", "uploads")));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
