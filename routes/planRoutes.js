import express from "express";
import { getPlans, getPlan, createPlan, updatePlan, deletePlan } from "../controllers/planController.js";

const router = express.Router();

router.get("/", getPlans);
router.get("/:id", getPlan);
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
