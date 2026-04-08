import express from "express";
import authRoutes from "./routes/authRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js";
import {env}from "./config/env.js"
let app = express()


//middleware
app.use(express.json())

//api
app.use("/api",authRoutes)
//error middleware
app.use(errorHandler)
app.listen(env.PORT,()=>{
    console.log(`Server is running on port ${env.PORT}`)
})