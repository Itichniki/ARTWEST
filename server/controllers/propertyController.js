import {createProperty} from "../services/property/createProperty.js";
import ApiError from "../error/ApiError.js";
import {updateProperty} from "../services/property/updateProperty.js";
import {deleteProperty} from "../services/property/deleteProperty.js";

class PropertyController {

    async createProperty(req, res) {
        try {

            const { name, address_line, price, images, status } = req.body;
            const property = await createProperty({name, address_line, price, images, status});
            return res.json(property);

        } catch (e) {
            return ApiError.internal(e.message);
        }
    }

    async updateProperty(req, res) {

        try {

            const { id } = req.params;
            const {name, address_line, price, images, status} = req.body;
            const property = await updateProperty({id, name, address_line, price, images, status});
            return res.json(property);

        } catch(e) {
            return ApiError.internal(e.message);
        }

    }

    async deleteProperty(req, res) {

        try {

            const { id } = req.params;
            const property = await deleteProperty(id);
            return res.json(property);

        } catch(e) {
            return ApiError.internal(e.message);
        }

    }

}

export default new PropertyController();