import {Company, Project} from "../models/models.js";

class ProjectController {

    async createProject(req, res) {
        try {
            const {name, description, company_id} = req.body;

            if (!name || !description) {
                return res.status(400).json("Full information should be provided");
            }

            const companyCandidate = await Company.findOne({where: {id: company_id}})

            if(!companyCandidate) {
                return res.status(404).json("Company not found");
            }

            const candidate = await Project.findOne({where: {name}});

            if (candidate) {
                return res.status(404).json("Project already exists");
            }

            const project = await Project.create({name, description, company_id});
            return res.json(project);

        } catch(e) {
            return res.status(500).json("Something went wrong");
        }
    }

    async updateProject(req, res) {
        try {

            const {id} = req.params;

            if(!id) {
                return res.status(401).json("ID should be provided");
            }

            const {name, description, company_id} = req.body;

            if (!name || !description) {
                return res.status(400).json("Full information should be provided");
            }

            if(!company_id) {
                return res.status(400).json("Company ID should be provided");
            }

            const companyCandidate = await Company.findOne({where: {id: company_id}})

            if(!companyCandidate) {
                return res.status(404).json("Company not found");
            }

            const projectCandidate = await Project.findOne({where: {id}});

            if(!projectCandidate) {
                return res.status(404).json("Project not found");
            }

            await Project.update({name, description, company_id}, {where: {id}});

            return res.json(`Project ${name} was updated successfully`);

        } catch(e) {
            return res.status(500).json("Something went wrong");
        }
    }

    async deleteProject(req, res) {
        try {

            const {id} = req.params;

            if(!id) {
                return res.status(401).json("ID should be provided");
            }

            const candidate = await Project.findOne({where: {id}});
            if (!candidate) {
                return res.status(404).json("Project not found");
            }

            await candidate.destroy();
            return res.json(`Project with id=${id} was deleted successfully`);

        } catch(e) {
            return res.status(500).json("Something went wrong");
        }
    }
}

export default new ProjectController();