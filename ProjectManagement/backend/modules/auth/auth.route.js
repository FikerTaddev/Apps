import { Router } from "express";
import { SignIn, SignUp , Profile} from "./auth.controller.js";
import {  jwtMiddleware } from "../../middleware/auth.middleware.js";

 const authRoutes = Router()
 const protectedRoutes = Router()

authRoutes.get("/signin", SignIn)
authRoutes.post("/signup", SignUp)
protectedRoutes.get("/profile", jwtMiddleware, Profile )
protectedRoutes.get("/admin", jwtMiddleware, Profile )
export { authRoutes , protectedRoutes}