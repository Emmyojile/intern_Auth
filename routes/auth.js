// Import required modules
import express from 'express';
const router = express.Router();

// Import controller functions from auth.js
import { register, login, registerPage, loginPage, dashboardPage } from "../controllers/auth.js";

// Import authMiddleware from auth.js
import authMiddleware from '../middlewares/auth.js';

// Register a new user
router.route("/register").post(register);

// Log in a user
router.route("/login").post(login);

// Render the registration page
router.route("/").get(registerPage);

// Render the login page
router.route("/login").get(loginPage);

// Access the dashboard page (protected route, requires authentication)
router.route("/dashboard").get(authMiddleware, dashboardPage);

export default router;
