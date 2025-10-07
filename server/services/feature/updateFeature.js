import ApiError from "../../error/ApiError.js";
import {Feature} from "../../models/models.js";

export const updateFeature = async (id, {name, icon}) => {

    if(!id) {
        throw ApiError.badRequest("ID should be provided!");
    }

    if(!name && !icon) {
        throw ApiError.badRequest("Any information should be provided");
    }

    const candidate = await Feature.findOne({where: {id}});

    if(!candidate) throw ApiError.badRequest("Feature does not exist!");

    const updateData = {};

    if(name !== undefined) {
        updateData.name = name;
    }

    if(icon !== undefined) {
        updateData.icon = icon;
    }

    const [updated] = await Feature.update(updateData, {where: {id}});

    if(updated === 0) {
        throw ApiError.badRequest("No feature was updated");
    }

    return candidate.name;
}