import { JsonDB } from "../db/Jsondb.js"
import { VerifyHash, VerifyToken, HashPwd, GenerateToken, ValidateEmail } from "../utils/utils.js"

const db = new JsonDB("./db/data.json")

export const RegisterUser = async (email, password) => {
    //check if email and password are provided
    if (!email || !password) {
        return { ok: false, error: "Email and password required" };
    }
    //normalize email
    const normalizedEmail = email.toLowerCase().trim();
    // check if existing
    const existingUser = db.findBy((user) => user.normalizedEmail === normalizedEmail)
    if (existingUser.length > 0) {
        return { ok: false, error: "User already exists" };
    }
    // validate email format
    const isValid = ValidateEmail(normalizedEmail)
    if (!isValid) {
        return { ok: false, error: "Invalid email format" };
    }

    // hash the password
    const HashedPasword = await HashPwd(password)
    // create user in the db 
    const _NewUser = db.insert({ normalizedEmail, password: HashedPasword })

    // create a token and return that to client 
    const token = GenerateToken({ id: _NewUser.id, email: _NewUser.normalizedEmail })
    return { ok: true, data: token };
}

export const LoginUser = async (email, password) => {
    //check if email and password are provided
    if (!email || !password) {
        return { ok: false, error: "Email and password required" };
    }
    //normalize email
    const normalizedEmail = email.toLowerCase().trim();
    // check if user exists
    const existingUser = db.findBy((user) => user.normalizedEmail === normalizedEmail)
    if (existingUser.length === 0) {
        return { ok: false, error: "User does not exist" };
    }
    // verify password
    const isMatch = await VerifyHash(password, existingUser[0].password)
    if (!isMatch) {
        return { ok: false, error: "Invalid credentials" };
    }
    // create a token and return that to client 
    const token = GenerateToken({ id: existingUser[0].id, email: existingUser[0].normalizedEmail })
    return { ok: true, data: token }
}