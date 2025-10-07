import {Project} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";
import res from "express/lib/response.js";

export const createProject = async({name, description, images}) => {

    if(!name || !description) {
        throw ApiError.badRequest("Full information should be provided");
    }

    const candidate = await Project.findOne({where: {name}});

    if(candidate) {
        throw ApiError.badRequest("Project already exists");
    }

    return await Project.create({name, description});

};