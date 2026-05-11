import { UnauthorizedAcess, IssueDoesntExist } from "@error/app";
import { CreateIssue, GetIssue, GetAllIssues } from "@issues/issues.repo";
import { GetProject, GetProjectByowner } from "@project/projects.repo";
import { isatty } from "node:tty";

export const AddNewissue = async (
  title: string,
  description: string,
  userId: number,
  ProjectId: number,
) => {
  const worksapceId = (await GetProjectByowner(userId)).workspace_id;
  if (!worksapceId) {
    throw new UnauthorizedAcess();
  }

  const issue = await CreateIssue(title, description, userId, ProjectId);

  return issue;
};

export const GetAnissue = async (id: number) => {
  const issue = await GetIssue(id);
  if (!issue) {
    throw new IssueDoesntExist();
  }
  return issue;
};

export const GetAllUserissues = async (id: number) => {
  const user_issue = await GetAllIssues(id);
  return user_issue;
};

export const IsUserAllowed = async (userId: number, worksapceId: number) => {
    const isAllowed = await (await GetProjectByowner(userId)).workspace_id;
    if (!isAllowed) {
        
    }
    
};
