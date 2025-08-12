// src/middleware/auth.js
import { verifyJWT } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  const auth = req.headers["authorization"] || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing Bearer token" });

  const payload = verifyJWT(token, process.env.JWT_SECRET || "");
  if (!payload || !payload.userId) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = { id: payload.userId, email: payload.email, name: payload.name };
  next();
}
