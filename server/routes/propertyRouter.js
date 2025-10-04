import express from 'express';
import propertyController from "../controllers/propertyController.js"
import checkRole from "../middleware/checkRoleMiddlware.js";

const router = express.Router();

router.get('/', propertyController.getAllProperties);
router.post('/', checkRole("ADMIN"), propertyController.createProperty);
router.put('/:id', checkRole("ADMIN"), propertyController.updateProperty);
router.delete('/:id', checkRole("ADMIN"), propertyController.deleteProperty);

export default router;