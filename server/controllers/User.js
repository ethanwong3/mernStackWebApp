import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

export const UserRegister = async () => {
  try {
    const { email, password, name, img } = req.body;

    // if existing user, throw err
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }

    // salting is when you add a password and hash it
    const salt = bcyrpt.genSaltSync(10);
    const hashedPassword = bcrpyt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });

    const createdUser = await User.save(); // user or User

    // ???
    const token = jwt.sign({ id: createdUser }, process.env.JWT, {
      expiresIn: "18 years",
    });

    // ???
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};
