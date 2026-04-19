import type { Request, Response, NextFunction } from "express";
import { AppError } from "../error/app.js";

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Internal server error",
  });
}
