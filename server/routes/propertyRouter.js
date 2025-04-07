import express from 'express';
import propertyController from "../controllers/propertyController.js"

const router = express.Router();

router.post('/add', propertyController.add);


export default router;