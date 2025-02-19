import Progress from "../models/Progress.js";
import { body, validationResult } from "express-validator";

// Validation rules
const progressValidationRules = [
  body("user").isMongoId().withMessage("Invalid user ID"),
  body("workout").isMongoId().withMessage("Invalid workout ID"),
  body("weight").optional().isNumeric().withMessage("Weight should be a number").bail(),
  body("reps").optional().isNumeric().withMessage("Reps should be a number").bail(),
];

// Get progress logs with pagination
export const getProgressLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const progressLogs = await Progress.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("workout")
      .exec();

    const count = await Progress.countDocuments();
    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      progressLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Log progress with validation
export const logProgress = [
  ...progressValidationRules,  // Add validation middleware
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProgress = new Progress(req.body);
      await newProgress.save();
      res.status(201).json(newProgress);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Delete progress log
export const deleteProgressLog = async (req, res) => {
  try {
    const deletedProgress = await Progress.findByIdAndDelete(req.params.id);
    if (!deletedProgress) return res.status(404).json({ message: "Progress log not found" });
    res.json({ message: "Progress log deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
