import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../repositories/userRepo.js";

export async function signUp(email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error("Email already exists");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    email,
    password: hashedPassword,
  });
}

export async function logIn(email, password) {
  const error = new Error("Invalid credentials");
  error.status = 401;

  const user = await findUserByEmail(email);
  if (!user) throw error;

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw error;

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return accessToken;
}