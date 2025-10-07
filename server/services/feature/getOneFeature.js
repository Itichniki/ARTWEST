import {Feature} from "../../models/models.js";
import ApiError from "../../error/ApiError.js"

export const getOneFeature = async (id) => {
    const feature = await Feature.findByPk(id);

    if (!feature) {
        throw ApiError.badRequest("Features not found");
    }

    return feature;
}