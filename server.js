import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import workoutRoutes from "./routes/workoutRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import weightRoutes from "./routes/weightRoutes.js";

dotenv.config(); // ✅ Correct way to load environment variables

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/weights", weightRoutes);

app.get("/", (req, res) => {
  res.send("Backend is live!");
});


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process if connection fails
  });
