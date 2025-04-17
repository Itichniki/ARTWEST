import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";

export const createProperty = async ({name, address_line, price, images, status}) => {

    if(!name || !address_line || !price || !images || !status) {
        return ApiError.badRequest("Please enter a valid info!");
    }

    const candidate = await Property.findOne({where: {name}});

    if (candidate) {
        return ApiError.badRequest("This property already exists!");
    }

    return await Property.create({name, address_line, price, images, status});

}