import {Company} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const createCompany = async ({name, description, image}) => {

    if (!name || !description) {
        return ApiError.badRequest("Full information should be provided");
    }

    const candidate = await Company.findOne({where: {name}});

    if (candidate) {
        return ApiError.badRequest("Company already exists");
    }

    return await Company.create({name, description, image});

}