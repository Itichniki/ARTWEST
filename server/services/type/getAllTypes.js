import {Type} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";

export const getAllTypes = async () => {
    const types = await Type.findAll();

    if (!types) {
        return ApiError.badRequest("Types not found");
    }
}