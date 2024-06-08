import express from "express";
import ctrl from "../controllers/adminController.js";
import validateBody from "../utils/validateBody.js";
import { schemas } from "../models/adminModel.js";
import authenticate from "./../middlewares/authenticate.js";

const router = express.Router();

router.get("/test", ctrl.test);
router.post(
  "/register",
  validateBody(schemas.registerAdminSchema),
  ctrl.registerAdmin
);
router.post("/login", validateBody(schemas.loginAdminSchema), ctrl.loginAdmin);
// router.post("/logout", ctrl.logoutAdmin);
// router.get("/current", ctrl.getCurrentAdmin);
// router.post("/update", ctrl.updateAdmin);
// router.delete("/:id", ctrl.deleteAdmin);
router.post("/logout", authenticate("admin"), ctrl.logoutAdmin);
router.get("/current", authenticate("admin"), ctrl.getCurrentAdmin);
router.post("/update", authenticate("admin"), ctrl.updateAdmin);
router.delete("/:id", authenticate("admin"), ctrl.deleteAdmin);

export default router;
