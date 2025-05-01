import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/check', authMiddleware, userController.check);

export default router;