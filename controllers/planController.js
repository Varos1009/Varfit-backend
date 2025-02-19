import Plan from "../models/Plan.js";
import { body, validationResult } from "express-validator";

// Validation rules for plan creation/updating
const planValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("level").isIn(["beginner", "intermediate", "advanced"]).withMessage("Level must be 'beginner', 'intermediate', or 'advanced'"),
  body("duration").isNumeric().withMessage("Duration must be a number").bail(),
  body("workouts").isArray().withMessage("Workouts should be an array of ObjectIds"),
];

// Get all plans with pagination
export const getPlans = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const plans = await Plan.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("workouts");

    const count = await Plan.countDocuments();
    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      plans,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single plan
export const getPlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).populate("workouts");
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a plan with validation
export const createPlan = [
  ...planValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPlan = new Plan(req.body);
      await newPlan.save();
      res.status(201).json(newPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Update a plan with validation
export const updatePlan = [
  ...planValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("workouts");
      if (!updatedPlan) return res.status(404).json({ message: "Plan not found" });
      res.json(updatedPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) return res.status(404).json({ message: "Plan not found" });
    res.json({ message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
