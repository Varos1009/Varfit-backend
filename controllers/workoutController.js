import Workout from "../models/Workout.js";
import { validationResult } from "express-validator";


// Get all workouts for a specific user
export const getWorkouts = async (req, res) => {
  try {
    const { userId } = req.query; // Ensure userId is passed as a query param

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const workouts = await Workout.find({ userId }); // Get all workouts for that user
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get a single workout for a specific user
export const getWorkoutsByUser = async (req, res) => {
  try {
      const { userId } = req.params; // ✅ Get userId from URL params

      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const workouts = await Workout.find({ userId }); // ✅ Fetch workouts only for this user
      res.json(workouts);
  } catch (error) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ message: "Internal server error", error });
  }
};


// Create a workout
export const createWorkout = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.body.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update Workout Function
export const updateWorkout = async (req, res) => {
  // Validate the request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find workout by ID and update with new data from the request body
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // If no workout is found, return 404 error
    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Return the updated workout
    res.json(updatedWorkout);
  } catch (error) {
    // Handle any other errors and return a 400 status with the error message
    console.error("Error updating workout:", error);
    res.status(400).json({ message: error.message });
  }
};




// Delete a workout
export const deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};