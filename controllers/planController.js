import Plan from "../models/Plan.js";

// Get all plans
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().populate("workouts");
    res.json(plans);
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

// Create a plan
export const createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a plan
export const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("workouts");
    if (!updatedPlan) return res.status(404).json({ message: "Plan not found" });
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
