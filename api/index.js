import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";

dotenv.config();
const { PORT } = process.env;

connectDB();
const app = express();
const port = PORT || 3000;

const __dirname = path.resolve();
console.log("Serving static files from: ", path.join(__dirname, "admin", "dist"));
console.log("Serving static files from: ", path.join(__dirname, "client", "dist"));

app.use(cors());
app.use(express.json());

app.use("/api/food", foodRouter);
app.use("/images", express.static(path.join(__dirname, "api", "uploads")));

app.use("/admin", express.static(path.join(__dirname, "/admin/dist")));
app.use("/", express.static(path.join(__dirname, "/client/dist")));

app.get("/admin/*", (req, res) => {
  console.log(`Admin route accessed: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, "admin", "dist", "index.html"));
});
app.get("*", (req, res) => {
  console.log(`Client route accessed: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
