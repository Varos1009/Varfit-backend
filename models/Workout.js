import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["strength", "cardio", "flexibility", "balance"], required: true },
  duration: { type: Number, required: true }, // in minutes
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
