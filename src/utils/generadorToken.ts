import jwt, { SignOptions } from "jsonwebtoken";
import type { JWTDecoded } from "../types/common.types";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "super_secret_key";

export function generarToken(
  id: string,
  name: string,
  email: string,
  picture?: string,
  expiresIn: SignOptions["expiresIn"] = "7d"
): string {
  const payload = { id, name, email, picture };
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verificarToken(token: string): JWTDecoded {
  return jwt.verify(token, JWT_SECRET) as JWTDecoded;
}