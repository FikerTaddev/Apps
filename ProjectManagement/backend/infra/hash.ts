import * as argon2 from "argon2";

export const HashPwd = async (pwd: string): Promise<string> => {
    const hash = await argon2.hash(pwd, {
        // Use the constant directly from the library
        type: argon2.argon2id, 
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1
    });
    return hash;
};

export const VerifyHash = async (pwd:string, hash:string) => {
    try {
        return await argon2.verify(hash, pwd)
    } catch (error) {
        console.log(error)
    }
}
