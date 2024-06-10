import express from "express";
import ctrl from "../controllers/userController.js";
import authenticate from "./../middlewares/authenticate.js";

const router = express.Router();

router.get("/", ctrl.test);
router.post("/register", ctrl.registerUser);
router.post("/login", ctrl.loginUser);
router.post("/profile", authenticate("user"), ctrl.updateUser);
router.delete("/profile", authenticate("user"), ctrl.deleteUser);
router.get("/current", authenticate("user"), ctrl.currentUser);
router.post("/logout", authenticate("user"), ctrl.logoutUser);
// router.get("/order/:id", authenticate("user"), getOrder);
// router.post("/order/:id", authenticate("user"), updateOrder);
// router.delete("/order/:id", authenticate("user"), deleteOrder);

export default router;
