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
export const getWorkout = async (req, res) => {
    try {
        const { userId } = req.query;  // ✅ Extract userId from query
        const { id: workoutId } = req.params;  // ✅ Extract workoutId

        if (!userId || !workoutId) {
            return res.status(400).json({ message: "Workout ID and User ID are required" });
        }

        const workout = await Workout.findOne({ _id: workoutId, userId }); // ✅ Ensure correct user
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.json(workout);
    } catch (error) {
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

// Update a workout for a specific user
export const updateWorkout = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: id, userId }, // Ensure workout belongs to the user
      req.body,
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Failed to update workout", error });
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