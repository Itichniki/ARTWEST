import {Router} from "express";
import userRouter from "./userRouter.js";
import companyRouter from "./companyRouter.js";
import projectRouter from "./projectRouter.js";
import propertyRouter from "./propertyRouter.js";
import favoriteRouter from "./favoriteRouter.js";

const router = new Router();

router.use('/user', userRouter);
router.use('/company', companyRouter);
router.use('/project', projectRouter);
router.use('/property', propertyRouter);
router.use('/favorite', favoriteRouter);

export default router;