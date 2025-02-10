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

// async => asynchronous function that allows for program to continue execution until promise is resolved
// await => waits for promise, can only be used in async declared (can be async by just returning a promise)
// calling an async function or using an async query requires then() or catch() if await is not used
export const UserRegister = async () => {
  try {
    const { email, password, name, img } = req.body;

    // if existing user, return 409 conflict err
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }

    // salting is when you add a password and hash it
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrpyt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });

    const createdUser = await user.save();

    // jwt.sign(payload, secret, options) => generates JWT to authenticate users
    const token = jwt.sign({ id: createdUser }, process.env.JWT, {
      expiresIn: "7d",
    });

    // 200 === success
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};
