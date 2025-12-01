import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JWTDecoded } from "../types/common.types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JWTDecoded & { _id?: string };
    }
  }
}

export function verifyClientJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTDecoded;

    // 🔹 Normalizamos el usuario
    req.user = {
      ...decoded,
      _id: decoded.id || (decoded._id as string),
      id: decoded.id,
      email: decoded.email,
      nombre: decoded.nombre as string,
    };

    next();
  } catch (_err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}