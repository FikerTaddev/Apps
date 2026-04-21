import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import * as ProjectServices from "@project/projects.service";
import { ProjectDoesntExist, UnauthorizedUser } from "@error/app";

export const GetProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const WorkspaceId = Number(req.params.workspaceId);
    const ProjectId = Number(req.params.projectId);

    if (!ProjectId) {
      const userId = req.auth?.id;

      if (!userId) {
        throw new UnauthorizedUser();
      }

      const Projects = await ProjectServices.GetAllUserProjects(Number(userId));
      return res.status(200).json(Projects);
    }

    const Project = await ProjectServices.GetAProject(ProjectId);

    if (!Project) {
      throw new ProjectDoesntExist();
    }

    res.status(200).json(Project);
  } catch (e) {
    next(e);
  }
};

export const CreateProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const UserId = Number(req.auth?.id);
    const WorkspaceId = Number(req.params.workspaceId);
    const name = req.body.name;
    const desc = req.body.desc;

    const Project = await ProjectServices.AddNewProject(
      name,
      desc,
      UserId,
      WorkspaceId,
    );

    res.status(201).json({ Project });
  } catch (e) {
    next(e);
  }
};
