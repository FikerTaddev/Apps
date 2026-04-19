export const ValidateEmail = (email) => {
    if (!email) {
        throw new Error("Email is required")
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return false
    }
    return true

}


