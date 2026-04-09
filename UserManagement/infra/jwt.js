import jwt from "jsonwebtoken"
export const GenerateToken = (payload) => {

    const token = jwt.sign(payload, env.JWT_SECRET,{
        expiresIn: '1h'
    })

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
