import ApiError from "../../error/ApiError.js";
import {Type} from "../../models/models.js";

export const updateType = async (id, {name, icon}) => {

    if(!id) {
        throw ApiError.badRequest("ID should be provided!");
    }

    if(!name && !icon) {
        throw ApiError.badRequest("Any information should be provided");
    }

    const candidate = await Type.findOne({where: {id}});

    if(!candidate) {
        throw ApiError.badRequest("Type does not exists");
    }

    return await Type.update({name, icon}, {where: {id}});
    
}