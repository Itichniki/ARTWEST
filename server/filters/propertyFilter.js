import {PropertyDto} from "../dto/property.dto.js"
import {Op} from "sequelize";
import {Property} from "../models/models.js";

export const propertyFilter = async (req, res) => {
    try {

        const params = req.query;

        const query = [];

        params.forEach((param) => {

            switch (param) {
            case "name":
                query.push({
                    name: {
                        [Op.iLike]: `%${param}%`
                    }
                })
                break;
                case "min_price":
                query.push({
                    price: {
                        [Op.gte]: param
                    }
                })
            default:
                break;
            }
        })

    } catch (e) {

    }
}
