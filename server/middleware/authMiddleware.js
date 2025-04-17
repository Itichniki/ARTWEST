import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

const authMiddleware = (req, res, next) => {

    if(req.method === 'OPTIONS') {
        next();
    }

    try {

        const authToken = req.headers.authorization;

        if (!authToken) {
            return next(ApiError.badRequest("Unauthorized"));
        }
        
        const token = authToken.split(' ')[1];

        if(!token) {
            return next(ApiError.unAuthorized("Unauthorized"));
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();

    } catch(e) {
        return next(ApiError.internal("Something went wrong"));
    }
}

export default authMiddleware;