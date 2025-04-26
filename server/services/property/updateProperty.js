import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";

export const updateProperty = async (id, input) => {

    const {name} = input;

    if(!id) {
        return ApiError.badRequest("ID should be provided");
    }

    const candidate = await Property.findOne({raw: true, where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Property not found");
    }

    Property.update(input, {where: {id}});
    return `Property ${name} was updated successfully`

}