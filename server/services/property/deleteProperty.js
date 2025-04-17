import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";

export const deleteProperty = async (id) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided!");
    }

    const candidate = await Property.findOne({where: {id}})

    if(!candidate) {
        return ApiError.badRequest("Property not found!");
    }

    return await candidate.destroy();

}