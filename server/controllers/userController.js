import {register} from "../services/user/register.js";
import {login} from "../services/user/login.js";
import {generateJwt} from "../utils/generateJwt.js";
import ApiError from "../error/ApiError.js";

class UserController {

    async register(req, res) {

        try {

            const { email, password, role } = req.body;
            const token = await register({ email, password, role });
            return res.json({token});

        } catch (e) {
            return ApiError.internal(e.message);
        }

    }

    async login(req, res) {

        try {
            const { email, password } = req.body;
            const token = await login({ email, password });
            return res.json({token});

        } catch(e) {
            return ApiError.internal(e.message);
        }
    }

    async check(req, res) {
        try {

            const token = generateJwt({id: req.user.id, email: req.user.email, role: req.user.role});
            return res.json({token});
            
        } catch (e) {
            return ApiError.internal(e.message);
        }
    }

}

export default new UserController();