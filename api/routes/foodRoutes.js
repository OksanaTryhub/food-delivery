import express from "express";
import {
  addFoodItem,
  getFoodList,
  getFoodItem,
  updateFoodItem,
  removeFoodItem,
  test,
} from "../controllers/foodController.js";
// import path from "path";

const router = express.Router();
// const __dirname = path.resolve();

router.get("/test", test);
router.post("/add", addFoodItem);
router.get("/", getFoodList);
router.get("/:id", getFoodItem);
router.post("/update/:id", updateFoodItem);
router.delete("/delete/:id", removeFoodItem);

export default router;
