import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

const authMiddleware = (req, res, next) => {

    if(req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return ApiError.badRequest("Unauthorized");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(e) {
        return ApiError.internal("Something went wrong");
    }

    next();
}

export default authMiddleware;