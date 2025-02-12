import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check if the request contains an Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "Invalid token format!"));
    }

    // Extract the token from the "Authorization" header
    const token = authHeader.split(" ")[1];

    // Check if the token exists
    if (!token) return next(createError(401, "You are not authenticated"));

    // Decode and verify the token using JWT secret
    const decode = jwt.verify(token, process.env.JWT);

    // Attach the decoded user data to the request object
    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};
