import express from "express";
import authRoutes from "./routes/authRoutes.js"
let app = express()


//middleware
app.use(express.json())

//api
app.use("/api",authRoutes)

app.listen(3900,()=>{
    console.log("Server is running on port 3900")
})