import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

const checkRole = (role) => {
    return (req, res, next) => {
        if(req.method === "OPTIONS") {
            next();
        }

        try {

            const authToken = req.headers.authorization;
            if (!authToken) {
                return next(ApiError.badRequest("Unauthorized"));
            }

            const token = authToken.split(' ')[1];

            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if(decoded.role !== role) {
                return next(ApiError.badRequest("You do not have access!"));
            }

            req.user = decoded;
            next();
        } catch(e) {
            return next(ApiError.internal("Something went wrong"));
        }

    }
}

export default checkRole;