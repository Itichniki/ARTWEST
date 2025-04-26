import ApiError from "../../error/ApiError.js";
import {Property} from "../../models/models.js";

export const createProperty = async (input) => {

    const {name} = input;

    if(Object.values(input).some(i => !i)) {
        return ApiError.badRequest("Please enter a valid info!");
    }

    const candidate = await Property.findOne({ where: { name } });

    if (candidate) {
        return ApiError.badRequest("This property already exists!");
    }

    return Property.create(input);

}