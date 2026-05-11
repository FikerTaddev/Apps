import express from "express";
import { authRoutes } from "./modules/auth/auth.route.js";
import { userRoutes } from "./modules/user/user.routes.js";
import { errorHandler } from "./middleware/error.handle.js";
import { workspaceRoutes } from "@workspaces/workspace.route";
import { projectRoutes } from "@project/projects.route";
import { IssuesRoutes } from "@issues/issues.route";

export const app = express();

//middlewares
app.use(express.json());

//api middleware
app.use("/auth/v1", authRoutes);
app.use("/profile", userRoutes);
app.use("/workspaces", workspaceRoutes);
app.use("/workspaces",projectRoutes)
app.use("/projects",IssuesRoutes)

//error middleware
app.use(errorHandler);
