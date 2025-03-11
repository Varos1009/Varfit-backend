import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import workoutRoutes from "./routes/workoutRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import weightRoutes from "./routes/weightRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/weights", weightRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(error => console.log(error));
