import express from "express";
import { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout } from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
