import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/login', userController.login);
router.post('/register', userController.register);
router.get('/auth', authMiddleware, userController.check);

export default router;