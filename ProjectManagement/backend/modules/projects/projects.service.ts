import { ProjectAlreadyExists, ProjectDoesntExist, UnauthorizedAcess } from "@error/app";
import {
  DoesProjectExist,
  CreateProject,
  GetProject,
  GetAllProjects,
  CheckOwner
} from "@project/projects.repo";

export const AddNewProject = async (
  name: string,
  desc: string,
  user_id: number,
  workspace_id:number
) => {
  const isOwner = await CheckOwner(user_id);
  if (!isOwner) {
    throw new  UnauthorizedAcess
  }
  const existing = await DoesProjectExist(name,user_id);
  if (!!existing) {
    throw new ProjectAlreadyExists();
  }

  const Project = await CreateProject(name, desc, user_id,workspace_id);

  return Project;
};

export const GetAProject = async (id: number) => {
  const Project = await GetProject(id);
  if (!Project) {
    throw new ProjectDoesntExist();
  }
  return Project;
};

export const GetAllUserProjects = async (id: number) => {
  const user_Project = await GetAllProjects(id);
  return user_Project;
};
