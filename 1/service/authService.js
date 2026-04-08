import { JsonDB } from "../db/Jsondb.js"
import {
    InvalidCredentialError,
    InvalidEmailFormatError,
    MissingFieldError,
    UserAlreadyExistsError,
    UserDoesnotExistError
} from "../error/app.js";
import { VerifyHash, VerifyToken, HashPwd, GenerateToken, ValidateEmail } from "../utils/utils.js"

const db = new JsonDB("./db/data.json")
export const authService = {}
authService.RegisterUser = async (email, password) => {
    //check if email and password are provided
    if (!email || !password) {
        throw new MissingFieldError
    }
    //normalize email
    const normalizedEmail = email.toLowerCase().trim();
    // check if existing
    const existingUser = db.findBy((user) => user.normalizedEmail === normalizedEmail)
    if (existingUser.length > 0) {
        throw new UserAlreadyExistsError
    }
    // validate email format
    const isValid = ValidateEmail(normalizedEmail)
    if (!isValid) {
        throw new InvalidEmailFormatError
    }

    // hash the password
    const HashedPasword = await HashPwd(password)
    // create user in the db 
    const _NewUser = db.insert({ normalizedEmail, password: HashedPasword })

    // create a token and return that to client 
    const token = GenerateToken({ id: _NewUser.id, email: _NewUser.normalizedEmail })
    return { ok: true, data: token };
}

    authService.LoginUser = async (email, password) => {
    //check if email and password are provided
    if (!email || !password) {
        throw new MissingFieldError
    }
    //normalize email
    const normalizedEmail = email.toLowerCase().trim();
    // check if user exists
    const existingUser = db.findBy((user) => user.normalizedEmail === normalizedEmail)
    if (existingUser.length === 0) {
        throw new UserDoesnotExistError
    }
    // verify password
    const isMatch = await VerifyHash(password, existingUser[0].password)
    if (!isMatch) {
        throw new InvalidCredentialError
    }
    // create a token and return that to client 
    const token = GenerateToken({ id: existingUser[0].id, email: existingUser[0].normalizedEmail })
    return { ok: true, data: token }
}