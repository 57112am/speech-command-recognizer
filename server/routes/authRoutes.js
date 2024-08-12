/**
 * @module routes/auth
 */

import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route POST /signup
 * @description Handles user signup.
 * @access Public
 */
router.post("/signup", signup);

/**
 * @route POST /login
 * @description Handles user login.
 * @access Public
 */
router.post("/login", login);

/**
 * @route POST /logout
 * @description Handles user logout.
 * @access Private
 */
router.post("/logout", logout);

export default router;
