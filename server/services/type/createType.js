import {getDirname} from "../../utils/pathUtils.js";
import ApiError from "../../error/ApiError.js";
import path from "path";
import {v4 as uuid_v4} from "uuid";
import {Type} from "../../models/models.js";

export const createType = async ({name, icon}) => {

    // const __dirname = getDirname(import.meta.url)
    // let iconFileName = uuid_v4() + ".png";

    //is all info provided
    if (!name || !icon) {
        throw ApiError.badRequest("Full information should be provided");
    }

    // await icon.mv(path.resolve(__dirname, "..", "public", "images", iconFileName));

    //is type already exists?
    const candidate = await Type.findOne({where: {name}});

    if (candidate) {
        throw ApiError.badRequest("Type already exists");
    }

    //create type
    return await Type.create({name, icon});

}