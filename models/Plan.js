import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  duration: { type: Number, required: true }, // in weeks
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
  createdAt: { type: Date, default: Date.now },
});

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
