import express from "express";
import {
  getAllPlans,
  getPlanByUserForCurrentWeek,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";

const router = express.Router();

// Fetch all plans
router.get("/:userId", getAllPlans);

// Fetch a plan for the current week for a specific user (requires ?userId=xxx)
router.get("/user/:userId", getPlanByUserForCurrentWeek);

// Create a new plan for a user
router.post("/", createPlan);

// Update an existing plan
router.put("/:planId", updatePlan);

// Delete a plan by its ID
router.delete("/:planId", deletePlan);

export default router;
