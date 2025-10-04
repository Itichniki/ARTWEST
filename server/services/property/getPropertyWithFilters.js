import {Property} from "../../models/models.js";
import {Feature} from "../../models/models.js";
import ApiError from "../../error/ApiError.js";
import {DataTypes} from "sequelize";
import {Op} from "sequelize";

export const getPropertyWithFilters = async (filters = {}) => {
        const {
            city,
            min_price,
            max_price,
            min_size,
            max_size,
            num_bedrooms,
            num_bathrooms,
            project_id,
            company_id,
            location_id,
            type_id,
            status,
            features
        } = filters;

        const where = {};

        if (min_price || max_price) {
            where.price = {};
            if (min_price) { where.price[Op.gte] = min_price; }
            if (max_price) { where.price[Op.lte] = max_price; }
        }

        if (min_size || max_size) {
            where.size = {};
            if (min_size) { where.size[Op.gte] = min_size; }
            if (max_size) { where.size[Op.lte] = max_size; }
        }

        if (city) {
            where.city = {[Op.iLike]: `%${city}%`};
        }

        if (location_id) {
            where.location_id = location_id;
        }

        if (num_bedrooms) {
            where.num_bedrooms = num_bedrooms;
        }

        if (num_bathrooms) {
            where.num_bathrooms = num_bathrooms;
        }

        if (project_id) {
            where.project_id = project_id;
        }

        if (company_id) {
            where.company_id = company_id;
        }

        if (location_id) {
            where.location_id = location_id;
        }

        if (type_id) {
            where.type_id = type_id;
        }

        if (status) {
            where.status = status;
        }

        const featuresIncluded = [];

        if (features && features.length > 0) {
            featuresIncluded.push(
                {
                    model: Feature,
                    where: { id: {[Op.in]: features}},
                    through: {attributes: [] },
                    required: true
                }
                )
        }

        console.log(where, featuresIncluded);

         return await Property.findAll({
             where: where, // Просто передаем объект where напрямую
             include: featuresIncluded, // include должен быть отдельным свойством
             distinct: true,
        });
}