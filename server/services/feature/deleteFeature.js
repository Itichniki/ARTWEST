import ApiError from "../../error/ApiError.js";
import {Feature} from "../../models/models.js";

export const deleteFeature = async (id) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided!");
    }

    const candidate = await Feature.findOne({where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Feature does not exist");
    }

    return await Feature.destroy({where: {id}});

}