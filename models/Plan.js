import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  duration: { type: Number, required: true }, // in weeks
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
  weeklySchedule: [
    {
      day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], required: true },
      workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }]
    }
  ],
  goals: { type: [String], default: [] }, // Example: ["Gain muscle", "Improve endurance"]
  estimatedCaloriesBurned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Indexing for faster search
PlanSchema.index({ title: 1, level: 1, duration: 1 });

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
