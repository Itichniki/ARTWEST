import {Type} from "../models/models.js";
import ApiError from "../error/ApiError.js";
import {v4 as uuid_v4} from "uuid";
import path from "path";
import { getDirname } from "../utils/pathUtils.js";

class TypeController {

    async create (req, res, next) {
        try {
            const {name} = req.body;
            const {icon} = req.files;
            const __dirname = getDirname(import.meta.url)
            let iconFileName = uuid_v4() + ".png";

            //is all info provided
            if (!name || !icon) {
                return ApiError.badRequest("Full information should be provided");
            }

            await icon.mv(path.resolve(__dirname, "..", "public", "images", iconFileName));

            //is type already exists?
            const candidate = await Type.findOne({where: {name}});

            if (candidate) {
                return next(ApiError.badRequest("Type already exists"));
            }

            //create type
            const type = await Type.create({name, icon: iconFileName});

            //send response
            return res.json(type);
        } catch (e) {
            next(e)
        }
    }

    async getAll (req, res, next) {
        try {
            const types = await Type.findAll();

            if (!types) {
                return next(ApiError.badRequest("Types not found"));
            }

            return await res.json(types);
        } catch (e) {

            next(e);

        }
    }

    async getOne (req, res ,next) {
        try {
            const id = req.params.id; //get id

            const type = await Type.findOne({ where: id });  //find type

            if (!type) {
                return next(ApiError.badRequest("Type not found"));//if type not found throw error
            }

            return await res.json(type); //return result

        } catch (e) {
            next(e)//throw internal error
        }
    }

    async delete (req, res, next) {
        try {
            const id = req.params.id;

            const type = await Type.findOne({ where: {id}});

            if (!type) {
                return next(ApiError.badRequest("Type not found"));
            }
            await type.destroy();

            return res.json(`Type with id ${id} was deleted!`);
        } catch (e) {
            next(e);
        }
    }
}

export default TypeController;