import {createProperty} from "../services/property/createProperty.js";
import ApiError from "../error/ApiError.js";
import {updateProperty} from "../services/property/updateProperty.js";
import {deleteProperty} from "../services/property/deleteProperty.js";
import {PropertyDto} from "../dto/property.dto.js";

class PropertyController {

    async createProperty(req, res, next) {
        try {

            const input = new PropertyDto(req.body);
            const property = await createProperty(input);
            return res.json(property);

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async updateProperty(req, res, next) {

        try {

            const { id } = req.params;
            const input = new PropertyDto(req.body);
            const property = await updateProperty(id, input);
            return res.json(property);

        } catch(e) {
            next(ApiError.internal(e.message));
        }

    }

    async deleteProperty(req, res, next) {

        try {

            const { id } = req.params;
            const property = await deleteProperty(id);
            return res.json(property);

        } catch(e) {
            next(ApiError.internal(e.message));
        }

    }

}

export default new PropertyController();