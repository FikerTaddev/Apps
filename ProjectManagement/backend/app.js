import express from "express";
import { authRoutes } from "./modules/auth/auth.route.js";
import { userRoutes } from "./modules/user/user.routes.js";
import { errorHandler } from "./middleware/error.handle.js";

export const app = express();

//middlewares
app.use(express.json());

//api middleware
app.use("/auth/v1", authRoutes);
app.use("/", userRoutes);

//error middleware
app.use(errorHandler);
