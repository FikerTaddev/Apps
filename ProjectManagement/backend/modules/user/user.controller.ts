import * as userService from "./user.service.js";
import { Request, Response, NextFunction } from "express";
export const Profile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.Profile(req);

    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};
