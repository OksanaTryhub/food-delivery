import express from "express";
import ctrl from "../controllers/foodController.js";
import { schemas } from "../models/foodModel.js";
import validateBody from "../utils/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "./../middlewares/authenticate.js";

const router = express.Router();

router.get("/", ctrl.getFoodList);
router.get("/added", authenticate("admin"), ctrl.getFoodListByOwner);
router.get("/:id", authenticate("admin"), isValidId, ctrl.getFoodItem);
router.post(
  "/add",
  authenticate("admin"),
  validateBody(schemas.addFoodSchema),
  ctrl.addFoodItem
);
router.post(
  "/update/:id",
  authenticate("admin"),
  isValidId,
  ctrl.updateFoodItem
);
router.delete(
  "/delete/:id",
  authenticate("admin"),
  isValidId,
  ctrl.deleteFoodItem
);

export default router;
