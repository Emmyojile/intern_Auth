// Import required modules
import express from 'express';
const router = express.Router();
import multer from 'multer';

const storage = multer.memoryStorage({
    destination: function (req, res, cb) {
        cb(null, '')
    }
}) 

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

// Import controller functions from auth.js
import { register, login, registerPage, loginPage, dashboardPage } from "../controllers/auth.js";

// Import authMiddleware from auth.js
import authMiddleware from '../middlewares/auth.js';

// Register a new user
router.route("/register").post(upload.single('userImage'),register);

// Log in a user
router.route("/login").post(login);

// Render the registration page
router.route("/register").get(registerPage);

// Render the login page
router.route("/login").get(loginPage);

// Access the dashboard page (protected route, requires authentication)
router.route("/dashboard").get(authMiddleware, dashboardPage);

export default router;
