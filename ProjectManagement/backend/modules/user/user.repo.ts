import { db } from "@config/db"

export const CreateUser = async (email:string, password:string) => {
  const res = await db.query(
    `
            INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *
        `,
    [email, password],
  );
  return res.rows[0];
};

export const FindUserByEmail = async (email:string) => {
  const res = await db.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [email],
  );
  return true ? res.rows[0] : false;
};

export const FindUserById = async (id:number) => {
  const res = await db.query(
    `
        SELECT * FROM users WHERE id = $1 
        `,
    [id],
  );
  return res.rows[0];
};
export const FindUsersCreationDate = async (id:number) => {
  const res = await db.query(`
    SELECT created_at FROM users WHERE id = $1
    `[id])
    return res
};
export const GetAllUsers = async () => {
  const res = await db.query(`
            SELECT * FROM users 
        `);
  return res.rows[0];
};
export const UpdateUser = async (id:number, email:string, password:string) => {
  const res = await db.query(
    `
        UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *
        `,
    [email, password, id],
  );
  return res.rows[0];
};
export const DeleteUser = async (id:number) => {
  const res = await db.query(
    `
    DELETE FROM users WHERE id = $1 RETURNING *
    `,
    [id],
  );
  return res.rows[0];
};
