import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["Strength", "Cardio", "Flexibility", "Balance"], required: true },
  duration: { type: Number, required: true }, // in minutes
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  userId: { type: String, required: true }, // Store Firebase user ID
}, { timestamps: true });

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
