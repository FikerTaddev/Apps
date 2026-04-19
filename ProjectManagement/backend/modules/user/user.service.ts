import { Request } from "express-jwt";
import { FindUserById } from "./user.repo.js";

export const Profile = async (req: Request) => {
  let id = req.auth?.id;

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
