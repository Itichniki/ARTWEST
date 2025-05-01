import {Router} from "express";
import userRouter from "./userRouter.js";
import companyRouter from "./companyRouter.js";
import projectRouter from "./projectRouter.js";
import typeRouter from "./typeRouter.js";
import locationRouter from "./locationRouter.js";
import propertyRouter from "./propertyRouter.js";

const router = new Router();

router.use('/user', userRouter);
router.use('/companies', companyRouter);
router.use('/projects', projectRouter);
router.use('/locations', locationRouter);
router.use('/types', typeRouter);
router.use('/properties', propertyRouter);

export default router;