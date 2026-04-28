import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { userId: decoded.userId };

    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}