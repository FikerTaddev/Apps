import { db } from "@config/db";
import { GetWorkspaceParams } from "@type/type";
import { QueryResult } from "pg";

export const CreateWorkspace = async (
  name: string,
  desc: string,
  user_id:number
): Promise<QueryResult<any>> => {
  let res = await db.query(
    `
         INSERT INTO workspaces (name, description,owner_id) VALUES ($1, $2,$3) RETURNING *
        `,
    [name, desc,user_id],
  );
  return res.rows[0];
};

export const GetWorkspace = async (param: GetWorkspaceParams) => {
  let par;
  if (param.id) {
    par = param.id;
  } else {
    par = param.name;
  }
  let res = await db.query(
    `
       SELECT * FROM workspaces WHERE name = $1
        `,
    [par],
  );
  return res.rows[0];
};

export const DoesWorkspaceExist = async (name: string): Promise<Boolean> => {
  let res = await db.query(
    `
      SELECT EXISTS(SELECT 1 FROM workspaces WHERE name = $1)
        `,
    [name],
  );
  return res.rows[0].exists;
};
