import ApiError from "../../error/ApiError.js";
import {Company} from "../../models/models.js";

const updateCompany = async (input) =>  {

    const {id, name, description} = input;

    if(!id) {
        return ApiError.badRequest("Company ID should be provided");
    }

    if(!name && !description) {
        return ApiError.badRequest("Any information should be provided");
    }

    const candidate = await Company.findOne({where: {id}})

    if(!candidate) {
        return ApiError.badRequest("Company does not exists");
    }

    if(!name || description) {
        return await Company.update({description}, {where: {id}});
    }

    if(name || !description) {
        return await Company.update({name}, {where: {id}});
    }

}

export default updateCompany;