import * as authService from "./auth.service.js";
import type { Request, Response, NextFunction } from "express";
export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const token = await authService.RegisterUser(email, password);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const token = await authService.LoginUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

