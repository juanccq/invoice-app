import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post( '/register', AuthController.register );

// Login a user
router.post( '/login', AuthController.login );

export default router;