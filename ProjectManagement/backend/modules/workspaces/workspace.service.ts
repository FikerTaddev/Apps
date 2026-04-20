import {
  CreateWorkspace,
  DoesWorkspaceExist,
  GetWorkspace,
} from "@workspaces/workspace.repo";
import { WorkspaceAlreadyExists, WorkspaceDoesntExist } from "@error/app";
import { GetWorkspaceParams } from "@type/type";

export const AddNewWorkspace = async (
  name: string,
  desc: string,
  user_id: number,
) => {
  const existing = await DoesWorkspaceExist(name);
  if (!!existing) {
    throw new WorkspaceAlreadyExists();
  }

  const workspace = await CreateWorkspace(name, desc,user_id);

  return workspace;
};

export const GetAworkspace = async (params: GetWorkspaceParams) => {
  const workspace = await GetWorkspace(params);
  if (!workspace) {
    throw new WorkspaceDoesntExist();
  }
  return workspace;
};
