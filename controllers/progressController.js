import Progress from "../models/Progress.js";

// ✅ Get Progress by User ID
export const getUserProgress = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const progress = await Progress.find({ userId }).populate("workouts.workoutsId");
    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add or Update Progress for a Specific Date
export const updateProgress = async (req, res) => {
  const { userId, date, workouts } = req.body;

  if (!userId || !date || !workouts) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingProgress = await Progress.findOne({ userId, date });

    if (existingProgress) {
      existingProgress.workouts = workouts;
      await existingProgress.save();
      return res.json(existingProgress);
    } else {
      const newProgress = new Progress({ userId, date, workouts });
      await newProgress.save();
      return res.status(201).json(newProgress);
    }
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};
