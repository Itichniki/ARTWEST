import {Router} from "express";
import TypeController from "../controllers/typeController.js";
import checkRole from "../middleware/checkRoleMiddlware.js";

const router = new Router();
const typeController = new TypeController();

router.get("/", typeController.getAllTypes);
router.get("/:id", typeController.getOneType);
router.post("/", checkRole("ADMIN"), typeController.createType);
router.put("/:id", checkRole("ADMIN"), typeController.updateType);
router.delete("/:id", checkRole("ADMIN"), typeController.deleteType);

export default router;

