import { Router } from "express";
import { jwtMiddleware } from "../../middleware/auth.middleware.js";
import {
  GetWorkspaceController,
  CreateWorkspaceController
} from "./workspaces.controller.js";

export const workspaceRoutes: Router = Router();

// GET all workspaces
workspaceRoutes.get("/", jwtMiddleware, GetWorkspaceController);

// GET single workspace
workspaceRoutes.get("/:id", jwtMiddleware, GetWorkspaceController);

// CREATE workspace
workspaceRoutes.post("/", jwtMiddleware, CreateWorkspaceController);