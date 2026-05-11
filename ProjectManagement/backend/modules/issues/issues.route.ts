import { Router } from "express";
import { jwtMiddleware } from "../../middleware/auth.middleware.js";
import { GetIssuesController ,CreateIssuesController} from "./issues.controller.js";
export const IssuesRoutes: Router = Router();

// GET all issues
IssuesRoutes.get("/:projectId/issues", jwtMiddleware);

// GET single Issues
IssuesRoutes.get("/:projectId/issues/:issuesId", jwtMiddleware, GetIssuesController);

// CREATE Issues
IssuesRoutes.post("/:projectId/issues", jwtMiddleware,CreateIssuesController);
// UPDATE Issues
IssuesRoutes.put("/:projectId/issues", jwtMiddleware);