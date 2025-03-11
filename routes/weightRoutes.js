import express from "express";
import { getUserWeight, updateWeight } from "../controllers/weightController.js";

const router = express.Router();

router.get("/:userId", getUserWeight);
router.post("/", updateWeight);

export default router;
