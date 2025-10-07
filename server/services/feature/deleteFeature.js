import ApiError from "../../error/ApiError.js";
import {Feature} from "../../models/models.js";

export const deleteFeature = async (id) => {

    if(!id) {
        throw ApiError.badRequest("ID should be provided!");
    }

    const candidate = await Feature.findOne({where: {id}});

    if(!candidate) {
        throw ApiError.badRequest("Feature does not exist");
    }

    await Feature.destroy({where: {id}});

    return candidate.name;

}