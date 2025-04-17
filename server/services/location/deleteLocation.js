import ApiError from "../../error/ApiError.js";

export const deleteLocation = async ({id}) => {

    if(!id) {
        return ApiError.badRequest("ID should be provided!");
    }

    const candidate = await Location.findOne({where: {id}});

    if(!candidate) {
        return ApiError.badRequest("Location not found!");
    }

    return await location.destroy({where: {id}});
    
}

