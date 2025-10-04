import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";

export const updateProperty = async (id, input, transaction = null) => {

    const {
        city,
        price,
        size,
        name,
        description,
        property_size,
        num_bedrooms,
        num_bathrooms,
        project_id,
        location_id,
        type_id,
        status,
        features
    } = input;

    if(!id) {
        return ApiError.badRequest("ID should be provided");
    }

    const candidate = await Property.findOne({raw: true, where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Property not found");
    }

    Property.update(input, {where: {id}}, {transaction});
    return `Property ${name} was updated successfully`
}