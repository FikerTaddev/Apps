
export type role = "owner" | "viewer" | "member"

export type GetWorkspaceParams = 
  | { id: string; name?: never } 
  | { id?: never; name: string };

export interface WorkspaceReq {
  name: string;
  desc: string;
}