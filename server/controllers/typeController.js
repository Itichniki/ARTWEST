import ApiError from "../error/ApiError.js";
import {createType} from "../services/type/createType.js";
import {getAllTypes} from "../services/type/getAllTypes.js";
import {getOneType} from "../services/type/getOneType.js";
import {deleteType} from "../services/type/deleteType.js";
import {updateType} from "../services/type/updateType.js";

class TypeController {

    async getAllTypes (req, res, next) {
        try {

            const types = await getAllTypes();
            return res.status(200).json({
                data: types
            });

        } catch (e) {
            next(e);
        }
    }

    async getOneType (req, res, next) {
        try {

            const {id} = req.params;
            const type = await getOneType(id);
            return res.status(200).json({
                data: type
            });

        } catch (e) {
            next(e);
        }
    }

    async createType (req, res, next) {

        try {

            const {name, icon} = req.body;
            // const {icon} = req.files;
            const type = await createType({name, icon});
            return res.status(200).json({
                message: `Type ${type.name} was created successfully`
            });

        } catch (e) {
            next(e)
        }
    }

    async updateType (req, res, next) {

        try {

            const {id} = req.params;
            const {name} = req.body;
            // const {icon} = req.files;
            await updateType(id, req.body);
            return res.status(200).json({
                message: `Type ${name} was updated successfully`
            });

        } catch(e) {
            next(e);
        }

    }

    async deleteType (req, res, next) {
        try {

            const {id} = req.params;
            const typeName = await deleteType(id);
            return res.status(200).json({
                message: `Type ${typeName} was deleted successfully`
            });

        } catch (e) {
            next(e);
        }
    }
}

export default TypeController;