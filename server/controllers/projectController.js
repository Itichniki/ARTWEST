import {createProject} from "../services/project/createProject.js";
import {updateProject} from "../services/project/updateProject.js";
import {deleteProject} from "../services/project/deleteProject.js";
import ApiError from "../error/ApiError.js";

class ProjectController {

    async createProject(req, res) {
        try {

            const {name, description, company_id} = req.body;
            const project = await createProject({name, description, company_id});
            return res.json(project);

        } catch(e) {
            return ApiError.internal(e.message);
        }
    }

    async updateProject(req, res) {
        try {

            const {id} = req.params;
            const {name, description, company_id} = req.body;
            const project = await updateProject({id, name, description, company_id});
            return res.json(`Project ${project.name} was updated successfully`);

        } catch(e) {
            return ApiError.internal(e.message);
        }
    }

    async deleteProject(req, res) {
        try {

            const {id} = req.params;
            await deleteProject({id});
            return res.json(`Project with id=${id} was deleted successfully`);

        } catch(e) {
            return ApiError.internal(e.message);
        }
    }
}

export default new ProjectController();