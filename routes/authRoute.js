import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing

// Register || method - POST
router.post("/signup", registerController);

// Login || method - POST
router.post("/signin", loginController);

// forgot password
router.post("/forgot-password", forgotPasswordController);

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected route admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
