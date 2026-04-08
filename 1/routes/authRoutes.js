import { Router } from "express";
import { SignIn, SignUp , Profile} from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
 const authRoutes = Router()
 const protectedRoutes = Router()

authRoutes.get("/signin", SignIn)
authRoutes.post("/signup", SignUp)
protectedRoutes.get("/profile", authMiddleware, Profile )
export { authRoutes , protectedRoutes}