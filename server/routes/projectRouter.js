import {Router} from "express";
import projectController from "../controllers/projectController.js";

const router = new Router();

router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.put('/', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.delete('/', projectController.deleteProject);

export default router;