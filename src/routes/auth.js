import express from "express";
import passport from "passport";
import AuthController from "../controllers/authController.js";

const router = express.Router();

// Registration route
router.post("/register", AuthController.register);

// Login route
router.post("/login", AuthController.login);

// Logout route
router.get("/logout", AuthController.logout);

export default router;
