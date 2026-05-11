import { db } from "@config/db";
import { QueryResult } from "pg";

export const CreateIssue = async (
  title: string,
  desc: string,
  userId: number,
  ProjectId: number,
): Promise<QueryResult<any>> => {
  let res = await db.query(
    `
         INSERT INTO issues (title, description,reporter_id,project_id) VALUES ($1, $2,$3,$4) RETURNING *
        `,
    [title, desc, userId,ProjectId],
  );
  return res.rows[0];
};

export const GetIssue = async (id: number) => {
  let res = await db.query(
    `
       SELECT * FROM issues WHERE id = $1
        `,
    [id],
  );
  return res.rows[0];
};

export const DoesIssueExist = async (title: string,userId:number): Promise<Boolean> => {
  let res = await db.query(
    `
      SELECT EXISTS(SELECT 1 FROM issues WHERE title = $1 AND reporter_id = $2)
        `,
    [title,userId],
  );
  return res.rows[0].exists;
};
export const GetAllIssues = async (ReporterId: number) => {
  

  const res = await db.query(`SELECT * FROM issues WHERE reporter_id = $1`, [
    ReporterId,
  ]);

  return res.rows;
};


export const CheckAssignee = async (AsigneeId : number) => {
 const res = await db.query(`SELECT EXISTS(SELECT 1 FROM projects WHERE assignee_id = $1)`, [
    AsigneeId,
  ]);

  return res.rows[0].exists;
}

export const CheckReporter = async (ReporterId : number) => {
const res = await db.query(`SELECT EXISTS(SELECT 1 FROM projects WHERE reporter_id = $1)`, [
    ReporterId,
  ]);

  return res.rows[0].exists;
}