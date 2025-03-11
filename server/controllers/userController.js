import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import {User} from "../models/models.js";
import ApiError from "../error/ApiError.js";

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email: email, role: role},
        process.env.SECRET_KEY,
        {
            expiresIn: '24h',
        }
    )
}

class UserController {

    async register(req, res) {

        const { email, password, role } = req.body;
        console.log(req.body);
        if(!email) {
            return ApiError.badRequest("Email should be provided!");
        }

        if(!password) {
            return ApiError.badRequest("Password should be provided!");
        }

        const candidate = await User.findOne({email: email});
        if (candidate) {
            return ApiError.internal("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({email: email, password: hashedPassword, role: role});
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async login(req, res) {

        const { email, password } = req.body;
        if(!email || !password) {
            return ApiError.badRequest("Email or password is wrong");
        }

        const user = await User.findOne({email: email});

        if(!user) {
            return ApiError.badRequest("User does not exist!");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return ApiError.badRequest("Password is wrong!");
        }

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req, res) {

    }

}

export default new UserController();