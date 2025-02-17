import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
  weight: { type: Number }, // in kg
  reps: { type: Number },
  date: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", ProgressSchema);
export default Progress;
