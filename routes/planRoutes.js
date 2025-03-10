import express from "express";
const router = express.Router();

import { getAllPlans, getPlanById, createPlan, updatePlan, deletePlan } from "../controllers/planController.js";

// Fetch all plans for a user
router.get("/user/:userId", getAllPlans); // ✅ Changed path to `/user/:userId`

// Fetch a plan by ID
router.get("/plan/:planId", getPlanById); // ✅ Changed path to `/plan/:planId`

// Create a new plan for a user
router.post("/", createPlan);

// Update an existing plan
router.put("/:planId", updatePlan);

// Delete a plan by its ID
router.delete("/:planId", deletePlan);

export default router;
