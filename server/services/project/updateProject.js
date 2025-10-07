import {Project} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const updateProject = async(id, {name, description, images}) => {

    if(!id) {
        throw ApiError.badRequest("ID should be provided");
    }

    if(!name || !description) {
        throw ApiError.badRequest("Full information should be provided");
    }

    const projectCandidate = await Project.findOne({where: {id}});

    if(!projectCandidate) {
        throw ApiError.notFound("Project not found");
    }

    await Project.update({name, description, images}, {where: {id}});

    return projectCandidate.name;
    
};