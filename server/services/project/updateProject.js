import {Company, Project} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const updateProject = async ({id, name, description, company_id}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided");
    }

    if (!name || !description) {
        return ApiError.badRequest("Full information should be provided");
    }

    if(!company_id) {
        return ApiError.badRequest("Company ID should be provided");
    }

    const companyCandidate = await Company.findOne({where: {id: company_id}})

    if(!companyCandidate) {
        return ApiError.notFound("Company not found");
    }

    const projectCandidate = await Project.findOne({where: {id}});

    if(!projectCandidate) {
        return ApiError.notFound("Project not found");
    }

    return await Project.update({name, description, company_id}, {where: {id}});

}