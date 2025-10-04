import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";
import {PropertyDto} from "../../dto/property.dto.js";

export const createProperty = async (input, transaction = null) => {

    const {name, project_id, description, price, property_size, num_bedrooms, num_bathrooms, size, features = []} = input;

    if(project_id) {
        const projectCandidate = await Property.findOne({ where: { id: project_id } });
        if (!projectCandidate) {
            return ApiError.badRequest("Please pass a valid project, or create a new one!");
        }
    }

    if(!name || !price || !num_bedrooms || !num_bathrooms || !size) {
        return ApiError.badRequest("Full information should be provided");
    }

    const property = await Property.create({
        name,
        project_id: project_id || null,
        price,
        property_size,
        num_bedrooms,
        num_bathrooms,
        size,
        description
    }, {transaction});


    if(features.length > 0) {
        await property.setFeatures(features, {transaction});
    }

    return property;
}