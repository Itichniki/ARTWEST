import {Router} from 'express';
import CompanyController from '../controllers/companyController.js';
import checkRole from "../middleware/checkRoleMiddlware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

// router.get('/:id', CompanyController.getOneCompany);
// router.get('/', CompanyController.getAllCompanies);
router.post('/', checkRole("ADMIN"), CompanyController.createCompany);
router.put('/:id', checkRole("ADMIN"), CompanyController.updateCompany);
router.put('/', CompanyController.updateCompany);
router.delete('/:id', checkRole("ADMIN"), CompanyController.deleteCompany);

export default router;