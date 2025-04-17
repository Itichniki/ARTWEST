import {addLocation} from "../services/location/addLocation.js";
import {updateLocation} from "../services/location/updateLocation.js";
import {deleteLocation} from "../services/location/deleteLocation.js";
import ApiError from "../error/ApiError.js";

class LocationController {

    async getAllLocations() {

    }

    async getOneLocation(req, res) {

    }

    async addLocation(req, res) {

        try {

            const {city, region, street, google_maps_link} = req.body;
            const location = await addLocation({city, region, street, google_maps_link});
            return res.json(location);

        } catch(e) {
            return ApiError.internal(e.message)
        }

    }

    async updateLocation(req, res) {

        try {
            const {id} = req.params;
            const {city, region, street, google_maps_link} = req.body;
            const location = await updateLocation({id, city, region, street, google_maps_link});
            return res.json(location);
        } catch(e) {
            return ApiError.internal(e.message)
        }

    }

    async deleteLocation(req, res) {

        try {
            const {id} = req.params;
            const location = await deleteLocation({id});
            return res.json(location);
        } catch(e) {
            return ApiError.internal(e.message)
        }
    }

}

export default new LocationController;