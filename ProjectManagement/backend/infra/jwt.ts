import jwt from "jsonwebtoken";
import { env } from "@config/env";
export const GenerateToken = (payload:any) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const VerifyToken = (token:string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log(err);
  }
};
