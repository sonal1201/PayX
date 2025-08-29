import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request type to include userid
declare global {
  namespace Express {
    interface Request {
      userid?: string;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { id: string };

    req.userid = decoded.id; // ✅ attach id from JWT payload

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
