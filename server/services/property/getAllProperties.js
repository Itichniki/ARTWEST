import {Property} from "../../models/models.js";
import {getPropertyWithFilters} from "./getPropertyWithFilters.js";
import ApiError from "../../error/ApiError.js";

export const getAllProperties = async (filters) => {
    if(filters) {
        return await getPropertyWithFilters(filters);
    } else {
        return await Property.findAll();
    }
};