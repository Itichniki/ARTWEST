import {Router} from "express";
import FeatureController from "../controllers/featureController.js";

const router = new Router()

router.get('/', FeatureController.getAllFeatures)
router.get('/:id', FeatureController.getOneFeature)
router.post('/', FeatureController.createFeature)
router.put('/:id', FeatureController.updateFeature)
router.delete('/:id', FeatureController.deleteFeature)

export default router;