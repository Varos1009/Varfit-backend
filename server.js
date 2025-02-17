import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import workoutRoutes from "./routes/workoutRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/progress", progressRoutes);

mongoose.connect("mongodb://localhost:27017/varfit")
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(error => console.log(error));
