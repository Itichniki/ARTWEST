import {User} from "../../models/models.js";
import bcrypt from "bcrypt";
import ApiError from "../../error/ApiError.js";
import {generateJwt} from "../../utils/generateJwt.js";

export const register = async ({email, password, role}) => {

    if(!email) {
        throw ApiError.badRequest("Email should be provided!");
    }

    if(!password) {
        throw ApiError.badRequest("Password should be provided!");
    }

    const candidate = await User.findOne({where: {email}});

    if (candidate) {
        throw ApiError.badRequest("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({email: email, password: hashedPassword, role: role});
    return await generateJwt(user.id, user.email, user.role);

}