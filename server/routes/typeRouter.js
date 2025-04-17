import {Router} from "express";
import TypeController from "../controllers/typeController.js";

const router = new Router();
const typeController = new TypeController();

router.get("/", typeController.getAllTypes);
router.get("/:id", typeController.getOneType);
router.post("/", typeController.createType);
router.delete("/:id", typeController.deleteType);

export default router;

