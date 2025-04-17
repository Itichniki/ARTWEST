import ApiError from "../../error/ApiError.js";
import {Feature} from "../../models/models.js";

export const addFeature = async ({name, icon}) => {

    if(!name || !icon) {
        return ApiError.badRequest("Info should be provided!");
    }

    const candidate = await Feature.findOne({where: {name}});

    if(candidate) {
        return ApiError.badRequest("Feature already exists!");
    }
    
    return await Feature.create({name, icon});

}