import ApiError from "../../error/ApiError.js";
import {Feature} from "../../models/models.js";

export const updateFeature = async ({id, name, icon}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided!");
    }

    if(!name && !icon) {
        return ApiError.badRequest("Any information should be provided");
    }

    const updateData = {};

    if(name !== undefined) {
        updateData.name = name;
    }

    if(icon !== undefined) {
        updateData.icon = icon;
    }

    const [updated] = await Feature.update(updateData, {where: {id}});

    if(updated === 0) {
        return ApiError.badRequest("No feature was updated");
    }

    return await Feature.findOne({where: {id}});
}