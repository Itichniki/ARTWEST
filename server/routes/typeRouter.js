import {Router} from "express";
import TypeController from "../controllers/typeController.js";

const router = new Router();
const typeController = new TypeController();

router.get("/", typeController.getAll);
router.get("/:id", typeController.getOne);
router.post("/", typeController.create);
router.delete("/:id", typeController.delete);

export default router;

