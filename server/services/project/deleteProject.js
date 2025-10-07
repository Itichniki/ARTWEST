import {Project} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const deleteProject = async(id) => {

    if(!id) {
        throw ApiError.badRequest("ID should be provided");
    }

    const candidate = await Project.findOne({where: {id}});

    if(!candidate) {
        throw ApiError.badRequest("Project not found");
    }

    await candidate.destroy();

    return candidate.name;

};