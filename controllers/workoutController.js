import Workout from "../models/Workout.js";
import { body, validationResult } from "express-validator";

// Validation rules
const workoutValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category").isIn(["strength", "cardio", "flexibility", "balance"]).withMessage("Invalid category"),
  body("duration").isInt({ min: 1 }).withMessage("Duration must be at least 1 minute"),
  body("difficulty").isIn(["beginner", "intermediate", "advanced"]).withMessage("Invalid difficulty level"),
];

// Get all workouts (with pagination)
export const getWorkouts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const workouts = await Workout.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Workout.countDocuments();
    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      workouts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single workout
export const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a workout
export const createWorkout = [
  ...workoutValidationRules, // Add validation middleware
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newWorkout = new Workout(req.body);
      await newWorkout.save();
      res.status(201).json(newWorkout);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Update a workout
export const updateWorkout = [
  ...workoutValidationRules, // Add validation middleware
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });
      res.json(updatedWorkout);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

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
