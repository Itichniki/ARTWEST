import {createProject} from "../services/project/createProject.js";
import {updateProject} from "../services/project/updateProject.js";
import {deleteProject} from "../services/project/deleteProject.js";
import ApiError from "../error/ApiError.js";
import {Project} from "../models/models.js";

class ProjectController {

    async getAllProjects(req, res, next) {

        try {

            const projects = await Project.findAll();
            return res.status(200).json({
                data: projects
            });

        } catch(e) {
            next(ApiError.internal(e.message));
        }

    }

    async getOneProject(req, res, next) {

        try {

            const {id} = req.params;

            if(!id) return ApiError.badRequest("ID is required");

            const project = await Project.findOne({where: {id}});
            return res.status(200).json({
                data: project
            });

        } catch(e) {
            next(ApiError.internal(e.message));
        }

    }

    async createProject(req, res, next) {
        try {

            const project = await createProject(req.body);
            return res.status(200).json({
                data: project
            });

        } catch(e) {
            next(e);
        }
    }

    async updateProject(req, res, next) {
        try {

            const {id} = req.params;
            const projectName = await updateProject(id, req.body);
            return res.status(200).json({
                message: `Project ${projectName} was updated successfully`
            });

        } catch(e) {
            next(e);
        }
    }

    async deleteProject(req, res, next) {
        try {

            const {id} = req.params;
            const projectName = await deleteProject(id);
            return res.status(200).json({
                message: `Project ${projectName} was deleted successfully`
            });

        } catch(e) {
            next(e);
        }
    }
}

export default new ProjectController();