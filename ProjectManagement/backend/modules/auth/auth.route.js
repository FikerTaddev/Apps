import { Router } from "express";
import { SignIn, SignUp , Profile} from "./auth.controller.js";


 const authRoutes = Router()


authRoutes.get("/signin", SignIn)
authRoutes.post("/signup", SignUp)

export { authRoutes }