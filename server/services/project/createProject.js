import {Company, Project} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";
import res from "express/lib/response.js";

export const createProject = async ({name, description, company_id}) => {

    if (!name || !description) {
        return ApiError.badRequest("Full information should be provided");
    }

    const companyCandidate = await Company.findOne({where: {id: company_id}})

    if(!companyCandidate) {
        return ApiError.badRequest("Company not found");
    }

    const candidate = await Project.findOne({where: {name}});

    if (candidate) {
        return ApiError.badRequest("Project already exists");
    }

    return await Project.create({name, description, company_id});

}