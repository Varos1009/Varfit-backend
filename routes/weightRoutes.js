import express from "express";
import { getUserWeight, addWeight } from "../controllers/weightController.js";

const router = express.Router();

router.get("/:userId", getUserWeight);
router.post("/", addWeight);

export default router;
