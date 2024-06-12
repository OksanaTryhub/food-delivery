import express from "express";
import ctrl from "../controllers/cartController.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/add", authenticate("user"), ctrl.addItemToCart);
router.post("/update-cart", authenticate("user"), ctrl.updateCartData);
router.post("/delete", authenticate("user"), ctrl.decreaseCartItemQuantity);
router.delete(
  "/delete/:id",
  authenticate("user"),
  isValidId,
  ctrl.deleteCartItem
);
router.delete("/clear-cart", authenticate("user"), ctrl.clearCart);
router.get("/", authenticate("user"), ctrl.getCartData);

export default router;
