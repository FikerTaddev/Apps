import {expressjwt as jwt }from "express-jwt"
import { env } from "../config/env.js"

export const authMiddleware = jwt({
    secret: env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
})


