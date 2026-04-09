import { Router } from "express";
import { SignIn, SignUp , Profile} from "../controller/authController.js";
import {  jwtMiddleware } from "../middleware/authMiddleware.js";
 const authRoutes = Router()
 const protectedRoutes = Router()

authRoutes.get("/signin", SignIn)
authRoutes.post("/signup", SignUp)
protectedRoutes.get("/profile", jwtMiddleware, Profile )
protectedRoutes.get("/admin", jwtMiddleware, Profile )
export { authRoutes , protectedRoutes}