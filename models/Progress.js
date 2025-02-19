import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Firebase UID
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
  weight: { type: Number }, // in kg
  reps: { type: Number },
  date: { type: Date, default: Date.now },
  duration: { type: Number }, // Exercise duration in seconds
});

const Progress = mongoose.model("Progress", ProgressSchema);
export default Progress;
