import {Type} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const getOneType = async (id) => {

    const type = await Type.findOne({ where: id });

    if (!type) {
        throw ApiError.badRequest("Type not found");
    }

    return type;

}