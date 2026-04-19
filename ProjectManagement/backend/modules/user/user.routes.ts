import { jwtMiddleware } from "../../middleware/auth.middleware.js";
import { Profile } from "./user.controller.js";
import { Router } from "express";

export const userRoutes :any = Router();

userRoutes.get("/", jwtMiddleware, Profile);
userRoutes.put("/update",jwtMiddleware);
userRoutes.delete("/delete",jwtMiddleware)
