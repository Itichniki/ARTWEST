import {register} from "../services/user/register.js";
import {login} from "../services/user/login.js";
import {generateJwt} from "../utils/generateJwt.js";
import ApiError from "../error/ApiError.js";

class UserController {

    async register(req, res, next) {

        try {

            const { email, password, role } = req.body;
            const token = await register({ email, password, role });

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 60 * 60 * 1000
            });

            return res.json({message: "Registered!"});

        } catch (e) {
            next(e);
        }

    }

    async login(req, res, next) {

        try {
            const { email, password } = req.body;
            const token = await login(email, password);

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 60 * 60 * 1000
            });

            return res.json({message: "Logged in!"});

        } catch(e) {
            next(e);
        }
    }

    async check(req, res, next) {
        try {
            return res.json({message: "Authorized!", user: req.user});
        } catch (e) {
            next(e);
        }
    }

}

export default new UserController();