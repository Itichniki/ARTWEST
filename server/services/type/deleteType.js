import {Type} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const deleteType = async (id) => {

    const type = await Type.findOne({ where: {id}});

    if (!type) {
        return ApiError.badRequest("Type not found");
    }
    await type.destroy();

}