import express from "express";
import { authRoutes, protectedRoutes } from "./modules/auth/auth.route.js"
import { errorHandler  } from "./middleware/error.handle.js";


export const app = express()


//middlewares
app.use(express.json())

//api middleware
app.use("/auth/v1", authRoutes)
app.use("/profile/v1", protectedRoutes)

//error middleware
app.use(errorHandler)


