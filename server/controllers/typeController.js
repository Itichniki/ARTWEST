import ApiError from "../error/ApiError.js";
import {createType} from "../services/type/createType.js";
import {getAllTypes} from "../services/type/getAllTypes.js";
import {getOneType} from "../services/type/getOneType.js";
import {deleteType} from "../services/type/deleteType.js";
import {updateType} from "../services/type/updateType.js";

class TypeController {

    async getAllTypes (req, res) {
        try {

            const types = await getAllTypes();
            return res.json(types);

        } catch (e) {
            return ApiError.internal(e.message);
        }
    }

    async getOneType (req, res) {
        try {

            const id = req.params.id;
            const type = await getOneType(id);
            return res.json(type);

        } catch (e) {
            return ApiError.internal(e.message);
        }
    }

    async createType (req, res) {

        try {

            const {name, icon} = req.body;
            // const {icon} = req.files;
            const type = await createType({name, icon});
            return res.json(type);

        } catch (e) {
            return ApiError.internal(e.message)
        }
    }

    async updateType (req, res) {

        try {

            const {name} = req.body;
            const {icon} = req.files;
            const type = await updateType({name, icon});
            return res.json(type);

        } catch(e) {
            return ApiError.internal(e.message);
        }

    }

    async deleteType (req, res) {
        try {

            const id = req.params.id;
            await deleteType(id);
            return res.json(`Type with id ${id} was deleted!`);

        } catch (e) {
            return ApiError.internal(e.message);
        }
    }
}

export default TypeController;