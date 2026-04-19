import { FindUserById, FindUsersCreationDate } from "./user.repo.js";

export const userService = {};
userService.Profile = async (req, res, next) => {

  let id = req.auth.id;

  const User = await FindUserById(id);
  let email = User.email;
  let role = User.role;
  let created_at = User.created_at;

  if (User) {
    return {
      id: id,
      email: email,
      role: role,
      created_at: created_at,
    };
  }
  return;
};
