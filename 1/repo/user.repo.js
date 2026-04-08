import { pool } from "../config/db.js"
export const CreateUser = async (email, password) => {
    const res = await pool.query(`
            INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *
        `, [email, password])
    return res.rows[0]
}

export const FindUserByEmail = async (email) => {
    const res = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `,[email])
        return res.rows[0]
}

export const FindUserById = async (id)=>{
    const res = await pool.query(`
        SELECT * FROM users WHERE id = $1 
        `, [id])
        return res.rows[0]
}

export const GetAllUsers = async ()=>{
    const res = await pool.query(`
            SELECT * FROM users 
        `)
    return res.rows[0]
}
export const UpdateUser = async (id,email,password)=>{
    const res = await pool.query(`
        UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *
        `,[email,password,id])
        return res.rows[0]
}
export const DeleteUser = async (id)=>{
  const res = await pool.query(`
    DELETE FROM users WHERE id = $1 RETURNING *
    `,[id])
    return res.rows[0]
}