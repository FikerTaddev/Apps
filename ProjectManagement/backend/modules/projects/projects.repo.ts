import { db } from "@config/db";
import { QueryResult } from "pg";

export const CreateProject = async (
  name: string,
  desc: string,
  user_id: number,
  workspace_id: number,
): Promise<QueryResult<any>> => {
  let res = await db.query(
    `
         INSERT INTO projects (name, description,owner_id,workspace_id) VALUES ($1, $2,$3,$4) RETURNING *
        `,
    [name, desc, user_id, workspace_id],
  );
  return res.rows[0];
};

export const GetProject = async (id: number) => {
  let res = await db.query(
    `
       SELECT * FROM projects WHERE id = $1
        `,
    [id],
  );
  return res.rows[0];
};

export const DoesProjectExist = async (name: string,user_id:number): Promise<Boolean> => {
  let res = await db.query(
    `
      SELECT EXISTS(SELECT 1 FROM projects WHERE name = $1 AND owner_id = $2)
        `,
    [name,user_id],
  );
  return res.rows[0].exists;
};
export const GetAllProjects = async (userId: number) => {
  

  const res = await db.query(`SELECT * FROM projects WHERE owner_id = $1`, [
    userId,
  ]);

  return res.rows;
};


export const CheckOwner = async (userId : number) => {
 const res = await db.query(`SELECT EXISTS(SELECT 1 FROM workspaces WHERE owner_id = $1)`, [
    userId,
  ]);

  return res.rows[0].exists;
}