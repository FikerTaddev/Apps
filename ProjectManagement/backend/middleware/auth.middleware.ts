import { expressjwt as jwt } from "express-jwt";
import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import type { role } from "../types/type.js";
export const jwtMiddleware = jwt({
  secret: env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //TODO : implement this middleware to check if the user is authenticated before accessing protected routes
};
export const requireRole = (role: role) => {
  //TODO : implement this middleware to check if the user has the required role to access certain routes
};
