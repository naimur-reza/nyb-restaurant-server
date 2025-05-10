

import jwt from "jsonwebtoken"

export const generateToken = (email: string) => {
    return jwt.sign({ email }, "jwtToken", { expiresIn: "1d" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, "jwtToken");
}


