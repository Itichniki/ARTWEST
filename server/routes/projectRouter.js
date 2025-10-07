import {Router} from "express";
import projectController from "../controllers/projectController.js";
import checkRole from "../middleware/checkRoleMiddlware.js";

const router = new Router();

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getOneProject);
router.post('/', checkRole("ADMIN"), projectController.createProject);
router.put('/:id', checkRole("ADMIN"), projectController.updateProject);
router.delete('/:id', checkRole("ADMIN"), projectController.deleteProject);

export default router;