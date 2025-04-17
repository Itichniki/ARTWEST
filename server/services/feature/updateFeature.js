import ApiError from "../../error/ApiError.js";
import {Feature} from "../../models/models.js";

export const updateFeature = async ({id, name, icon}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided!");
    }

    const candidate = await Feature.findOne({where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Feature not found!");
    }

    return await Feature.update({name, icon}, {where: {id}});
    
}