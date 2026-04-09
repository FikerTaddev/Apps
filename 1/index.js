import express from "express";
import { authRoutes, protectedRoutes } from "./routes/authRoutes.js"
import { errorHandler  } from "./middleware/errorHandler.js";
import { env } from "./config/env.js"

let app = express()


//middlewares
app.use(express.json())

//api middleware
app.use("/auth/v1", authRoutes)
app.use("/profile/v1", protectedRoutes)

//error middleware
app.use(errorHandler)


//listener
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
})