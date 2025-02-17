import Progress from "../models/Progress.js";

// Get progress logs
export const getProgressLogs = async (req, res) => {
  try {
    const progressLogs = await Progress.find().populate("workout");
    res.json(progressLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Log progress
export const logProgress = async (req, res) => {
  try {
    const newProgress = new Progress(req.body);
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
