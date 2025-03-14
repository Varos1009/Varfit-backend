import Plan from "../models/Plan.js";
import { validationResult } from "express-validator";


// ✅ Get all plans
export const getAllPlans = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const plans = await Plan.find({ userId });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a plan by ID
export const getPlanById = async (req, res) => {
  const { planId } = req.params;

  if (!planId) {
    return res.status(400).json({ message: "Plan ID is required" });
  }
  try {
    const plan = await Plan.findById(planId);
    console.log("🔍 Plan retrieved:", plan);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a plan
export const createPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userId, title, workouts } = req.body;

    if (!userId || !title || !workouts || workouts.length !== 7) {
      return res.status(400).json({ message: "Invalid input data, workouts for all 7 days are required." });
    }

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));

    const newPlan = new Plan({
      userId,
      title,
      week: startOfWeek,
      workouts,
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating plan." });
  }
};

// Update a plan
export const updatePlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, title, workouts } = req.body;
    const { planId } = req.params;

    if (!userId || !title || !workouts || workouts.length !== 7) {
      return res.status(400).json({ message: "Invalid input data, workouts for all 7 days are required." });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(planId, { userId, title, workouts }, { new: true });

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(updatedPlan);
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const deletedPlan = await Plan.findByIdAndDelete(planId);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
