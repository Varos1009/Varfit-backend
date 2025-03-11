import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  userId: { type: String, required: true }, 
}, { timestamps: true });

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
