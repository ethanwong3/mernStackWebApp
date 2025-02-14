import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    console.log("🔍 Incoming Headers:", req.headers); // Debugging log

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Invalid Authorization Header");
      return next(createError(401, "Invalid token format!"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("❌ Token is missing");
      return next(createError(401, "You are not authenticated"));
    }

    const decoded = jwt.verify(token, process.env.JWT);
    console.log("✅ Token Decoded:", decoded);

    req.user = decoded;
    return next();
  } catch (err) {
    console.error("❌ JWT Verification Failed:", err);
    next(err);
  }
};
