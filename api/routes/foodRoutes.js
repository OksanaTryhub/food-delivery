import express from "express";
import { addFoodItem, getFoodList, removeFoodItem } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();

const uploadsDir = path.join(__dirname, "api", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFoodItem);
router.get("/foodlist", getFoodList);
router.delete("/delete/:id", removeFoodItem);

export default router;
