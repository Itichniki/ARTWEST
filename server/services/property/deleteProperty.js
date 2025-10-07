import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";

export const deleteProperty = async (id) => {

    if(!id) {
        throw ApiError.badRequest("ID should be provided!");
    }

    const candidate = await Property.findOne({where: {id}})

    if(!candidate) {
        throw ApiError.badRequest("Property not found!");
    }

    await candidate.destroy();
    
    return candidate.name;

}