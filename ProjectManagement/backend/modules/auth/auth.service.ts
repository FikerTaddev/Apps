import {
  CreateUser,
  FindUserByEmail,
} from "../user/user.repo.js";
import {
  InvalidCredentialError,
  InvalidEmailFormatError,
  MissingFieldError,
  UserAlreadyExistsError,
  UserDoesnotExistError,
} from "../../error/app.js";
import { ValidateEmail } from "../../utils/utils.js";
import { VerifyHash, HashPwd } from "../../infra/hash.js";
import { GenerateToken } from "../../infra/jwt.js";
import { wrapDbOp } from "../../infra/wrapper.js";
import { role } from "../../types/role.js";

export const RegisterUser = async (
  email: string,
  password: string,
  role: role = "viewer",
) => {
  //check if email and password are provided
  if (!email || !password) {
    throw new MissingFieldError();
  }
  //normalize email
  const normalizedEmail = email.toLowerCase().trim();
  // check if existing
  const existingUser = await FindUserByEmail(normalizedEmail);
  if (existingUser) {
    throw new UserAlreadyExistsError();
  }
  // validate email format
  const isValid = ValidateEmail(normalizedEmail);
  if (!isValid) {
    throw new InvalidEmailFormatError();
  }

  // hash the password
  const HashedPasword = await HashPwd(password);
  // create user in the db
  const _NewUser = await wrapDbOp(() =>
    CreateUser(normalizedEmail, HashedPasword),
  );

  // create a token and return that to client
  const token = GenerateToken({
    id: _NewUser.id,
    email: _NewUser.normalizedEmail,
  });
  return { ok: true, data: token };
};

export const LoginUser = async (email: string, password: string) => {
  //check if email and password are provided
  if (!email || !password) {
    throw new MissingFieldError();
  }
  //normalize email
  const normalizedEmail = email.toLowerCase().trim();
  // check if user exists
  const existingUser = await FindUserByEmail(normalizedEmail);
  if (!existingUser) {
    throw new UserDoesnotExistError();
  }
  // verify password
  const isMatch = await VerifyHash(password, existingUser.password);
  if (!isMatch) {
    throw new InvalidCredentialError();
  }
  // create a token and return that to client
  const token = GenerateToken({
    id: existingUser.id,
    email: existingUser.normalizedEmail,
  });
  return { ok: true, data: token };
};
