import { jwtMiddleware } from "../../middleware/auth.middleware.js";
import { Profile } from "./user.controller.js";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("/profile", jwtMiddleware, Profile);
