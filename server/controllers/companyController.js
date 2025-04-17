import updateCompany from "../services/company/updateCompany.js";
import {createCompany} from "../services/company/createCompany.js";
import {removeCompany} from "../services/company/removeCompany.js";

class CompanyController {

    async createCompany(req, res) {
        try {

            const {name, description, image} = req.body;
            const company = await createCompany({name, description, image});
            return res.json(company);

        } catch(e) {
            return res.status(500).json(e.message);
        }
    }

    async updateCompany(req, res) {
        try {

            const {id} = req.params;
            const {name, description} = req.body;
            const company = await updateCompany({ id, name, description});
            return res.json(company);

        } catch(e) {
            return res.status(500).json("Something went wrong");
        }
    }

    async deleteCompany(req, res) {
        try {

            const {id} = req.params;
            const company = await removeCompany({ id});
            return res.json(company);

        } catch(e) {
            return res.status(500).json("Something went wrong", e);
        }
    }

}

export default new CompanyController();