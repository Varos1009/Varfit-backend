import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  week: { type: Date, required: true },
  workouts: [
    {
      day: { type: String, required: true },
      workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true }, 
    },
  ],
}, { timestamps: true });

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
