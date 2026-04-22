import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import * as workspaceServices from "@workspaces/workspace.service";
import { UnauthorizedUser, WorkspaceDoesntExist } from "@error/app";

export const GetWorkspaceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      const userId = req.auth?.id;

      if (!userId) {
        throw new UnauthorizedUser
      }

      const workspaces = await workspaceServices.GetAllUserWorkspaces(
        Number(userId),
      );
      return res.status(200).json([workspaces]);
    }

    const workspaceId = Number(idParam);
    const workspace = await workspaceServices.GetAworkspace(workspaceId);

    if (!workspace) {
      throw new WorkspaceDoesntExist
    }

    res.status(200).json({workspace});
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
