import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import * as IssuesServices from "@issues/issues.service";
import { IssueDoesntExist, UnauthorizedUser } from "@error/app";

export const GetIssuesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const IssuesId = Number(req.params.issuesId);

    if (!IssuesId) {
      const userId = req.auth?.id;

      if (!userId) {
        throw new UnauthorizedUser();
      }

      const Issuess = await IssuesServices.GetAllUserissues(Number(userId));
      return res.status(200).json(Issuess);
    }

    const Issues = await IssuesServices.GetAnissue(IssuesId);

    if (!Issues) {
      throw new IssueDoesntExist();
    }

    res.status(200).json(Issues);
  } catch (e) {
    next(e);
  }
};

export const CreateIssuesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ProjectId = Number(req.params.projectId);
    const UserId = Number(req.auth?.id);
    // const WorkspaceId = Number(req.params.workspaceId);
    const title = req.body.title;
    const description = req.body.description;

    const Issues = await IssuesServices.AddNewissue(title, description, UserId,ProjectId);

    res.status(201).json({ Issues });
  } catch (e) {
    next(e);
  }
};
