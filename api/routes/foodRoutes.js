import express from "express";
import { addFoodItem, getFoodList, removeFoodItem, test } from "../controllers/foodController.js";
// import path from "path";

const router = express.Router();
// const __dirname = path.resolve();

router.get("/test", test);
router.post("/add", addFoodItem);
router.get("/", getFoodList);
router.delete("/delete/:id", removeFoodItem);

export default router;
