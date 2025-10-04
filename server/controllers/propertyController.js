import {createProperty} from "../services/property/createProperty.js";
import ApiError from "../error/ApiError.js";
import {updateProperty} from "../services/property/updateProperty.js";
import {deleteProperty} from "../services/property/deleteProperty.js";
import {getAllProperties} from "../services/property/getAllProperties.js";
import {PropertyDto} from "../dto/property.dto.js";
import sequelize from "../db.js";

class PropertyController {

    async createProperty(req, res) {
        const transaction = await sequelize.transaction();

        try {

            const input = req.body;
            const property = await createProperty(input, transaction);

            await transaction.commit();
            return res.json(property);

        } catch (e) {
            await transaction.rollback();
            return ApiError.internal(e.message);
        }
    }

    async getAllProperties(req, res) {
        try {
            if(req.body) {
                const properties = await getAllProperties(req.body);
                return res.json(properties);
            }
            const properties = await getAllProperties();
            return res.json(properties);
        } catch (e) {
            return ApiError.internal(e.message);
        }
    }

    async updateProperty(req, res) {
        const transaction = await sequelize.transaction();

        try {

            const { id } = req.params;
            const input = new PropertyDto(req.body);
            const property = await updateProperty(id, input, transaction);

            await transaction.commit();
            return res.json(property);

        } catch(e) {
            await transaction.rollback();
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