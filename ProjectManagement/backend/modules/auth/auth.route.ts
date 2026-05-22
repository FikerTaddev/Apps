import { Router } from "express";
import { SignIn, SignUp} from "./auth.controller.js";


 const authRoutes :any = Router()


authRoutes.get("/signin", SignIn)
authRoutes.post("/signup", SignUp)

export { authRoutes }