import express from "express";
import {
  loginUser,
  registerUser,
  test,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
