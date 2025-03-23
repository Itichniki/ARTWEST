
import {Company} from "../models/models.js";

class CompanyController {

    async createCompany(req, res) {
        try {
            const {name, description} = req.body;

            if (!name || !description) {
                return res.status(400).json("Full information should be provided");
            }

            const candidate = await Company.findOne({where: {name}});

            if (candidate) {
                return res.status(404).json("Company already exists");
            }

            const company = await Company.create({name, description});
            return res.json(company);

        } catch(e) {
            return res.status(500).json("Something went wrong");
        }
    }

    async updateCompany(req, res) {
        try {

            const {id} = req.params;

            if(!id) {
                return res.status(400).json("Company ID should be provided");
            }

            const {name, description} = req.body;

            const candidate = await Company.findOne({where: {id}})

            if(!candidate) {
                return res.status(404).json("Company does not exists");
            }

            if(!name || !description) {
                return res.status(400).json("Full information should be provided");
            }

            const updatedCompany = await Company.update({name, description}, {where: {id}});
            return res.json(`Company ${name} was updated`);

        } catch(e) {
            return res.status(500).json("Something went wrong");
        }
    }

    async deleteCompany(req, res) {
        try {

            const {id} = req.params;

            if(!id) {
                return res.status(401).json("ID should be provided");
            }

            const candidate = await Company.findOne({where: {id}})

            if(!candidate) {
                return res.status(401).json("Company does not exists");
            }

            await Company.destroy({where: {id}});
            return res.json(`Company with id ${id} was deleted!`);
        } catch(e) {
            return res.status(500).json("Something went wrong", e);
        }
    }

}

export default new CompanyController();