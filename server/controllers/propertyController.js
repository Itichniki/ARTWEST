import {createProperty} from "../services/property/createProperty.js";
import ApiError from "../error/ApiError.js";
import {updateProperty} from "../services/property/updateProperty.js";
import {deleteProperty} from "../services/property/deleteProperty.js";
import {getAllProperties} from "../services/property/getAllProperties.js";
import {PropertyDto} from "../dto/property.dto.js";
import sequelize from "../db.js";
import {Property} from "../models/models.js";

class PropertyController {

    async getAllProperties(req, res, next) {
        try {

            if(req.body) {
                const properties = await getAllProperties(req.body);
                return res.status(200).json({
                    data: properties
                });
            }
            const properties = await getAllProperties();
            return res.status(200).json({
                data: properties
            });

        } catch(e) {
            next(e);
        }
    }

    async getOneProperty(req, res, next) {
        try {

            const {id} = req.params;
            const property = await Property.findByPk(id);
            return res.status(200).json({
                data: property
            });

        } catch(e) {
            next(e);
        }
    }

    async createProperty(req, res, next) {
        const transaction = await sequelize.transaction();

        try {

            const property = await createProperty(req.body, transaction);

            await transaction.commit();
            return res.status(200).json({
                data: property
            });

        } catch(e) {
            await transaction.rollback();
            next(e);
        }
    }

    async updateProperty(req, res, next) {
        const transaction = await sequelize.transaction();

        try {

            const {id} = req.params;
            const input = new PropertyDto(req.body);
            await updateProperty(id, input, transaction);

            await transaction.commit();
            return res.status(200).json({
                message: `Property ${input.name} updated successfully`,
            })

        } catch(e) {
            await transaction.rollback();
            next(e);
        }

    }

    async deleteProperty(req, res, next) {

        try {

            const {id} = req.params;
            const propertyName = await deleteProperty(id);
            return res.status(200).json({
                message: `Property ${propertyName} deleted successfully`
            });

        } catch(e) {
            next(e);
        }

    }

}

export default new PropertyController();