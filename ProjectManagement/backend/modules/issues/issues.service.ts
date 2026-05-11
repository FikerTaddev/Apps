import { UnauthorizedAcess, IssueDoesntExist , UnauthorizedProjectAcess } from "@error/app";
import { CreateIssue, GetIssue, GetAllIssues ,UpdateIssue} from "@issues/issues.repo";
import { GetProject, GetProjectByowner } from "@project/projects.repo";
import { QueryResult } from "pg";

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
export const Updateissue = async (
  title: string,
  description: string,
  userId: number,
  ProjectId: number,
  status:string
): Promise<QueryResult<any>> => {

  const worksapceId = (await GetProjectByowner(userId)).workspace_id;
   
  if (!worksapceId) {
    throw new UnauthorizedAcess();
  }
 
  if (!(await GetProject(userId))) {
    throw new UnauthorizedProjectAcess();
  }
  
  
  return await UpdateIssue(ProjectId,userId,title, description,status);
};
