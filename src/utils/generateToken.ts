

import jwt from "jsonwebtoken"

export const generateToken = (email: string) => {
    return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1d" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
}


