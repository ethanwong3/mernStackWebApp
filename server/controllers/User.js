import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";
import mongoose from "mongoose";

dotenv.config();

// async => asynchronous function that allows for program to continue execution until promise is resolved
// await => waits for promise, can only be used in async declared (can be async by just returning a promise)
// calling an async function or using an async query requires then() or catch() if await is not used
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // if existing user, return 409 conflict err
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }

    // salting is when you add a password and hash it
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });

    const createdUser = await user.save();

    // jwt.sign(payload, secret, options) => generates JWT to authenticate users
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    // 200 === success
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if existing user, return 409 conflict err
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Password is incorrect"));
    }

    // ._id =>
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    // 200 === success
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    //calculte total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Calculate total no of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    //Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Format category data for pie chart

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

export const addWorkout = async (req, res, next) => {
  try {
    // Ensure the user is authenticated
    const userId = req.user?.id;
    if (!userId) {
      return next(createError(401, "Invalid or missing user ID in token"));
    }

    const { workoutString } = req.body;
    if (!workoutString || typeof workoutString !== "string") {
      return next(createError(400, "Invalid workout format"));
    }

    // Split workout string into lines
    const eachWorkout = workoutString.split("\n").map((line) => line.trim());

    // Ensure the workout follows the correct format
    if (eachWorkout.length < 5) {
      return next(
        createError(
          400,
          "Workout format is incorrect. Please enter in the correct format."
        )
      );
    }

    // Extract and validate workout details
    const category = eachWorkout[0].replace(/^#/, "").trim();
    const workoutName = eachWorkout[1].replace(/^- /, "").trim();

    // Validate sets and reps format (ensure correct parsing of "- 5 sets X 15 reps")
    const setsRepsMatch = eachWorkout[2].match(
      /^- (\d+)\s*sets\s*X\s*(\d+)\s*reps/
    );
    if (!setsRepsMatch) {
      return next(createError(400, "Invalid sets/reps format"));
    }

    const sets = parseInt(setsRepsMatch[1], 10);
    const reps = parseInt(setsRepsMatch[2], 10);

    // Convert weight and duration safely while removing "- " prefix
    const weight =
      parseFloat(eachWorkout[3].replace(/^- /, "").replace("kg", "").trim()) ||
      0;
    const duration =
      parseFloat(eachWorkout[4].replace(/^- /, "").replace("min", "").trim()) ||
      0;

    // Calculate calories burnt (Example formula)
    const caloriesBurned = duration * 5;

    // Validate extracted values
    if (isNaN(sets) || isNaN(reps) || isNaN(weight) || isNaN(duration)) {
      return next(
        createError(400, "Invalid numeric values in workout details")
      );
    }

    // Create workout object
    const workoutDetails = {
      category,
      workoutName,
      sets,
      reps,
      weight,
      duration,
      caloriesBurned,
      user: new mongoose.Types.ObjectId(userId),
      date: new Date(),
    };

    // Save to database
    const newWorkout = await Workout.create(workoutDetails);

    return res.status(201).json({
      message: "Workout added successfully",
      workout: newWorkout,
    });
  } catch (err) {
    console.error("❌ Error in addWorkout:", err);
    next(err);
  }
};
