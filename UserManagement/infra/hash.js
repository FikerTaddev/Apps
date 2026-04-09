import argon2, { argon2id } from "argon2"
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
