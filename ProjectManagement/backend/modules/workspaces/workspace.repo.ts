import { db } from "@config/db";
import { GetWorkspaceParams } from "@type/type";
import { QueryResult } from "pg";

export const CreateWorkspace = async (
  name: string,
  desc: string,
  user_id: number,
): Promise<QueryResult<any>> => {
  let res = await db.query(
    `
         INSERT INTO workspaces (name, description,owner_id) VALUES ($1, $2,$3) RETURNING *
        `,
    [name, desc, user_id],
  );
  return res.rows[0];
};

export const GetWorkspace = async (id: number) => {
  let res = await db.query(
    `
       SELECT * FROM workspaces WHERE id = $1
        `,
    [id],
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
export const GetAllWorkspaces = async (userId: number) => {


  const res = await db.query(
    'SELECT * FROM workspaces WHERE owner_id = $1', 
    [userId]
  );
  
  return res.rows;
};
