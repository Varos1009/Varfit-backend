import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["strength", "cardio", "flexibility", "balance"], required: true },
  duration: { type: Number, required: true }, // in minutes
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  equipment: { type: [String], default: [] }, // Example: ["Dumbbell", "Jump Rope"]
  exercises: [
    {
      name: { type: String, required: true },
      reps: { type: Number, min: 1 },
      sets: { type: Number, min: 1 },
      duration: { type: Number, min: 1 }, // in seconds (for cardio)
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

// Indexing for faster lookup
WorkoutSchema.index({ name: 1, category: 1 });

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
