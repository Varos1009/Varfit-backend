import express from "express";
import {
  getWorkouts,
  getWorkoutsByUser,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getWorkouts); // Fetch all workouts for a specific user (requires ?userId=xxx)
router.get("/user/:userId", getWorkoutsByUser); // Fetch a single workout for a specific user (requires ?userId=xxx)
router.post("/", createWorkout); // Create a workout for a user
router.put("/:id", updateWorkout); // Update a workout for a user
router.delete("/:id", deleteWorkout); // Delete a workout for a user (requires ?userId=xxx)

export default router;
