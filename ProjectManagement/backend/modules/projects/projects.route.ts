import { Router } from "express";
import { jwtMiddleware } from "../../middleware/auth.middleware.js";
import { GetProjectController  ,CreateProjectController} from "@project/projects.controller"

export const projectRoutes: Router = Router();

// GET all Projects
projectRoutes.get("/:workspaceId/projects", jwtMiddleware,GetProjectController);

// GET single Project
projectRoutes.get("/:workspaceId/projects/:projectId", jwtMiddleware,GetProjectController);

// CREATE Project
projectRoutes.post("/:workspaceId/projects", jwtMiddleware, CreateProjectController);