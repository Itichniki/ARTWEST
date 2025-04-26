import {Company} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const createCompany = async ({name, description, image}) => {

    if (!name) {
        return ApiError.badRequest("Name should be provided!");
    }

    if(!description) {
        return ApiError.badRequest("Description should be provided!");
    }

    const candidate = await Company.findOne({where: {name}});

    if (candidate) {
        return ApiError.badRequest("Company already exists");
    }

    return await Company.create({name, description, image});

}