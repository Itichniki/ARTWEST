import ApiError from "../../error/ApiError.js";
import {Location} from "../../models/models.js";

export const addLocation = async ({city, region, street, google_maps_link = ""}) => {

    if(!city || !region || !street) {
        return ApiError.badRequest("Information should be provided fully");
    }

    const candidate = await Location.findOne({where: {city, region, street}});

    if(candidate) {
       return ApiError.badRequest("Location already exists");
    }

    return await Location.create({
        city: city,
        region: region,
        street: street,
        google_maps_link: google_maps_link
    })
    
}