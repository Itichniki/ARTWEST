import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

const authMiddleware = (req, res, next) => {

    if(req.method === 'OPTIONS') {
        return next();
    }

    try {

        const token = req.cookies.token;

        if(!token) {
            return next(ApiError.unAuthorized("Unauthorized"));
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY);

        next();

    } catch(e) {
        next(e);
    }
}

export default authMiddleware;