import {Router} from "express";
import userRouter from "./userRouter.js";
import companyRouter from "./companyRouter.js";
import projectRouter from "./projectRouter.js";
import typeRouter from "./typeRouter.js";
import locationRouter from "./locationRouter.js";
import propertyRouter from "./propertyRouter.js";

const router = new Router();

router.use('/user', userRouter);
router.use('/company', companyRouter);
router.use('/project', projectRouter);
router.use('/location', locationRouter);
router.use('/type', typeRouter);
router.use('/property', propertyRouter);

export default router;