import express from "express";
import ctrl from "../controllers/cartController.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/test", authenticate("user"), ctrl.cartTest);
router.post("/add", authenticate("user"), ctrl.addToCart);
router.post("/delete", authenticate("user"), ctrl.removeFromCart);
router.get("/", authenticate("user"), ctrl.getCartData);

export default router;
