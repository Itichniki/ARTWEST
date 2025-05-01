import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

const checkRole = (role) => {
    return (req, res, next) => {

        if(req.method === "OPTIONS") {
            next();
        }

        try {

            const token = req.cookies.token;

            if (!token) {
                next(ApiError.badRequest("Unauthorized"));
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if(decoded.role !== role) {
                next(ApiError.badRequest("You do not have access!"));
            }

            req.user = decoded;
            next();

        } catch(e) {
            next(e);
        }

    }
}

export default checkRole;