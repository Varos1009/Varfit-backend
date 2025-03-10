import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  week: { type: Date, required: true }, // The week for which the plan is created
  workouts: [
    {
      day: { type: String, required: true }, // e.g., 'Monday', 'Tuesday'
      workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true }, // Workout associated with the day
    },
  ],
}, { timestamps: true });

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
