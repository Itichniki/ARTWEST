import {Router} from "express";
import locationController from "../controllers/locationController.js";

const router = new Router();

router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getOneLocation);
router.post('/add', locationController.addLocation);
router.put('/', locationController.updateLocation);
router.put('/:id', locationController.updateLocation);
router.post('/', locationController.deleteLocation);
router.post('/:id', locationController.deleteLocation);

export default router;