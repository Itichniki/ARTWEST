import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";

export const updateProperty = async ({id, name, address_line, price, images, status}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided");
    }

    const candidate = await Property.findOne({raw: true, where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Property not found");
    }

    const result = await Property.update({name, address_line, price, images, status}, {where: {id}});
    return `Property ${name} was updated successfully`

}