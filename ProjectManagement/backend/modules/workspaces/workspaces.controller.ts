import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import * as workspaceServices from "@workspaces/workspace.service";

export const GetWorkspaceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const idParam = req.params.id;

    // If no ID is provided in the URL, fetch all workspaces for the user
    if (!idParam) {
      // Assuming req.auth.sub or req.auth.id contains the user's unique identifier from express-jwt
      const userId = req.auth?.id; 
      console.log("Full Token Payload:", req.auth);
      
      if (!userId) {
  return res.status(401).json({ error: "Unauthorized: User ID missing from token" });
}

      const workspaces = await workspaceServices.GetAllUserWorkspaces(Number(userId));
      return res.status(200).json(workspaces);
    }

    // Otherwise, fetch the specific workspace by ID
    const workspaceId = Number(idParam);
    const workspace = await workspaceServices.GetAworkspace(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.status(200).json(workspace);
  } catch (e) {
    next(e);
  }
};

export const CreateWorkspaceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const workspace = await workspaceServices.AddNewWorkspace(
      req.body.name,
      req.body.desc,
      Number(req.params.id),
    );

    res.status(201).json({ workspace });
    console.log(res);
  } catch (e) {
    next(e);
  }
};
