import {User} from "../../models/models.js";
import bcrypt from "bcrypt";
import ApiError from "../../error/ApiError.js";
import {generateJwt} from "../../utils/generateJwt.js";

export const login = async (email, password) => {

    if(!email || !password) {
        throw ApiError.badRequest("Email or password is wrong");
    }

    const user = await User.findOne({where: {email}});

    if(!user) {
        throw ApiError.badRequest("User does not exist!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        throw ApiError.badRequest("Password is wrong!");
    }

    return await generateJwt(user.id, user.email, user.role);

}