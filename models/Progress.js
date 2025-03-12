import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  workouts: [
    {
      workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
      name: { type: String, required: true },
      completed: { type: Boolean, required: true }
    }
  ]
}, { timestamps: true });

const Progress = mongoose.model("Progress", ProgressSchema);
export default Progress;
