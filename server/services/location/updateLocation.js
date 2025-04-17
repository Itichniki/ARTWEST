import ApiError from "../../error/ApiError.js";

export const updateLocation = async ({id, city, region, street, google_maps_link}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided!");
    }

    const candidate = await Location.findOne({where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Location not found!");
    }

    if(!city || !region || !street) {
        return ApiError.badRequest("At least on field to be changed should be provided!");
    }

    return await Location.update({where: {id}}, {city, region, street, google_maps_link});

}