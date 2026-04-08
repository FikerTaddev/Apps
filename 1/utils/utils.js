import argon2, { argon2id } from "argon2"
import jwt from "jsonwebtoken"
import { env } from "../config/env.js"

export const HashPwd = async (pwd) => {

    const hash = await argon2.hash(pwd, {
        type: argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1
    })
    return hash
}

export const VerifyHash = async (pwd, hash) => {
    try {
        return await argon2.verify(hash, pwd)
    } catch (error) {
        console.log(error)
    }
}

export const GenerateToken = (payload) => {

    const token = jwt.sign(payload, env.JWT_SECRET)

    return token
}

export const VerifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET)
        return decoded
    } catch (err) {
        console.log(err)
    }
}

export const ValidateEmail = (email) => {
    if (!email) {
        throw new Error("Email is required")
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return false
    }
    return true

}