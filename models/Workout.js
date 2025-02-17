import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["strength", "cardio", "flexibility", "balance"], required: true },
  duration: { type: Number, required: true }, // in minutes
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  exercises: [
    {
      name: { type: String, required: true },
      reps: { type: Number, required: false },
      sets: { type: Number, required: false },
      duration: { type: Number, required: false }, // in seconds (for cardio)
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
