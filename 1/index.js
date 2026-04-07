import express from "express";
import authRoutes from "./routes/authRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js";
let app = express()


//middleware
app.use(express.json())

//api
app.use("/api",authRoutes)
//error middleware
app.use(errorHandler)
app.listen(3900,()=>{
    console.log("Server is running on port 3900")
})