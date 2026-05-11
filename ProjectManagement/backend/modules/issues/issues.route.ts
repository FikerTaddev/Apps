import { Router } from "express";
import { jwtMiddleware } from "../../middleware/auth.middleware.js";
import {
  GetAllIssuesController,
  CreateIssuesController,
  GetAnIssuesController,
} from "./issues.controller.js";

export const IssuesRoutes: Router = Router();

// GET all issues
IssuesRoutes.get("/:projectId/issues", jwtMiddleware, GetAllIssuesController);

// GET single Issues
IssuesRoutes.get(
  "/:projectId/issues/:issuesId",
  jwtMiddleware,
  GetAnIssuesController,
);

// CREATE Issues
IssuesRoutes.post("/:projectId/issues", jwtMiddleware, CreateIssuesController);
// UPDATE Issues
IssuesRoutes.put("/:projectId/issues", jwtMiddleware);
