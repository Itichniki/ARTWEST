import {Company} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const removeCompany = async ({id}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided");
    }

    const candidate = await Company.findOne({where: {id}})

    if(!candidate) {
        return ApiError.badRequest("Company does not exists");
    }

    await Company.destroy({where: {id}});

    return `Company ${candidate.name} deleted successfully`;

}