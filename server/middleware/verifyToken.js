import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check if the request contains an Authorization header
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Extract the token from the "Authorization" header
    const token = req.headers.authorization.split(" ")[1];

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
