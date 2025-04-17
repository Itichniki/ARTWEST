import {Project} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const deleteProject = async ({id}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided");
    }

    const candidate = await Project.findOne({where: {id}});

    if (!candidate) {
        return ApiError.badRequest("Project not found");
    }

    return await candidate.destroy();

}