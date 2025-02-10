import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

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

// Server start response
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Server has started on port 8080",
  });
});

// Connection to DB (called in startServer)
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => console.log("Connected to DB"))
    .catch((err) => {
      console.log(err);
    });
};

// main function to start server
const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server running at port 8080"));
  } catch (err) {
    console.log(err);
  }
};

startServer();
