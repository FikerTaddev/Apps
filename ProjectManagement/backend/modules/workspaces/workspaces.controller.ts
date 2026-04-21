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

    if (!idParam) {
      const userId = req.auth?.id;
      console.log("Full Token Payload:", req.auth);

      if (!userId) {
        //TODO : remove this and add it to error handler
        return res
          .status(401)
          .json({ error: "Unauthorized: User ID missing from token" });
      }

      const workspaces = await workspaceServices.GetAllUserWorkspaces(
        Number(userId),
      );
      return res.status(200).json(workspaces);
    }

    const workspaceId = Number(idParam);
    const workspace = await workspaceServices.GetAworkspace(workspaceId);

    if (!workspace) {
      //TODO : remove this and add it to error handler
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
      Number(req.auth?.id),
    );

    res.status(201).json({ workspace });
   
  } catch (e) {
    next(e);
  }
};
