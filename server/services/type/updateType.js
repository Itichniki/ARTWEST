import ApiError from "../../error/ApiError.js";
import {Type} from "../../models/models.js";

export const updateType = async ({id, name, icon}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided!");
    }

    if(!name && !icon) {
        return ApiError.badRequest("Any information should be provided");
    }

    const candidate = await Type.findOne({where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Type does not exists");
    }

    return await Type.update({name, icon}, {where: {id}});
    
}