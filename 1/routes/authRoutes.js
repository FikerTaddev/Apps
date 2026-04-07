import { Router } from "express";
import { SignIn, SignUp } from "../controller/authController.js";
 const authRoutes = Router()

authRoutes.get("/signin", SignIn)
authRoutes.post("/signup", SignUp)

export default authRoutes