import {Feature} from "../../models/models.js";
import ApiError from "../../error/ApiError.js"

export const getAllFeatures = async () => {
    const features = await Feature.findAll();

    if (!features) {
        return ApiError.badRequest("Features not found");
    }

    return features;
}