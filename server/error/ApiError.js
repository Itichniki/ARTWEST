class ApiError extends Error {

    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }

    static unAuthorized(message) {
        return new ApiError(401, message);
    }

    static Forbidden(message) {
        return new ApiError(403, message);
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static conflict (message) {
        return new ApiError(409, message)
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static notImplemented(message) {
        return new ApiError(501, message);
    }

    static badGateway(message) {
        return new ApiError(502, message);
    }
}

export default ApiError;