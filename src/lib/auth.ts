import jwt from "jsonwebtoken";
import { env } from "@/env.js";

export interface JWTPayload {
  userId: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Generate a JWT token for admin authentication
 */
export function generateToken(userId = "admin"): string {
  const payload: JWTPayload = {
    userId,
    role: "admin",
  };

  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
    issuer: "a-el-key-admin",
    audience: "a-el-key-app",
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    if (!env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET, {
      issuer: "a-el-key-admin",
      audience: "a-el-key-app",
    }) as JWTPayload;

    if (decoded.role !== "admin") {
      throw new AuthError("Invalid role");
    }

    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError("Invalid token");
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError("Token expired");
    }
    throw error;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string {
  if (!authHeader) {
    throw new AuthError("No authorization header");
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AuthError("Invalid authorization header format");
  }

  const token = parts[1];
  if (!token) {
    throw new AuthError("No token provided");
  }

  return token;
}

/**
 * Validate admin credentials (simple hardcoded for now)
 * In production, this should check against a database
 */
export function validateAdminCredentials(
  username: string,
  password: string,
): boolean {
  // Simple hardcoded credentials for now
  // In production, use proper password hashing and database lookup
  const validCredentials = {
    username: "andi",
    password: "kakrinski123", // Change this in production!
  };

  const isValid =
    username === validCredentials.username &&
    password === validCredentials.password;

  return isValid;
}
