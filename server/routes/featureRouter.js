import {Router} from "express";
import FeatureController from "../controllers/featureController.js";

const router = new Router()

router.post('/', FeatureController.addFeature)
router.put('/:id', FeatureController.updateFeature)
router.delete('/:id', FeatureController.deleteFeature)
router.get('/', FeatureController.getAllFeatures)

export default router;