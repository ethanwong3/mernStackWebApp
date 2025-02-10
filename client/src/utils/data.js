import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

export const counts = [
  {
    name: "Calories Burned",
    icon: (
      <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />
    ),
    desc: "Total calories burned today",
    key: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Workouts",
    icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Total no of workouts for today",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Average  Calories Burned",
    icon: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Average Calories Burned on each workout",
    key: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];

export const dummyWorkouts = [
  {
    category: "Strength",
    workoutName: "Bench Press",
    sets: 4,
    reps: 10,
    weight: 80,
    duration: 5,
  },
  {
    category: "Cardio",
    workoutName: "Treadmill Running",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 30,
  },
  {
    category: "Strength",
    workoutName: "Squats",
    sets: 5,
    reps: 8,
    weight: 100,
    duration: 7,
  },
  {
    category: "HIIT",
    workoutName: "Burpees",
    sets: 3,
    reps: 15,
    weight: 0,
    duration: 10,
  },
  {
    category: "Endurance",
    workoutName: "Cycling",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 45,
  },
  {
    category: "Strength",
    workoutName: "Deadlifts",
    sets: 4,
    reps: 6,
    weight: 120,
    duration: 6,
  },
  {
    category: "Mobility",
    workoutName: "Yoga",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 60,
  },
];
