import {Router} from "express";
import userRouter from "./userRouter.js";
import projectRouter from "./projectRouter.js";
import typeRouter from "./typeRouter.js";
import propertyRouter from "./propertyRouter.js";
import featureRouter from "./featureRouter.js";

const router = new Router();

router.use('/user', userRouter);
router.use('/projects', projectRouter);
router.use('/types', typeRouter);
router.use('/properties', propertyRouter);
router.use('/features', featureRouter);

export default router;