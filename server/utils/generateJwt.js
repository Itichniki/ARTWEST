import jwt from "jsonwebtoken";

export const generateJwt = async (id, email, role) => {
    return jwt.sign(
        {id: id, email: email, role: role},
        process.env.SECRET_KEY,
        {
            expiresIn: "24h",
        }
    )
}