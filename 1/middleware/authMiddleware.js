import {expressjwt as jwt }from "express-jwt"
import { env } from "../config/env.js"

export const jwtMiddleware = jwt({
    secret: env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
})

export const requireAuth = (req, res, next) => {
    //TODO : implement this middleware to check if the user is authenticated before accessing protected routes
}
export const requireRole = (role) => {
    //TODO : implement this middleware to check if the user has the required role to access certain routes
}
