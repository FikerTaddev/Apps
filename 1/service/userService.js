export const Profile = async (req, res, next) => {

    let id = req.auth.id
    let email = req.auth.email

    const User = FindUserById(id)
    if (User) {
        return {
            "id": id,
            "email": email
        }
    }
}
