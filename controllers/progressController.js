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
  console.log("updateProgress function called");
  const { userId, date, workouts } = req.body;

  const parsedDate = new Date(date);

  // Normalize the date to midnight to avoid issues with time zone differences
  const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));

  console.log("Start of Day:", startOfDay);  // Log the normalized date for debugging

  // Ensure workouts is always an array
  const workoutArray = Array.isArray(workouts) ? workouts : [workouts];

  console.log("Workouts as array:", workoutArray);

  try {
    const existingProgress = await Progress.findOne({
      userId,
      date: { $gte: startOfDay, $lt: new Date(startOfDay).setDate(startOfDay.getDate() + 1) }
    });

    if (existingProgress) {
      console.log("Updating existing progress for date:", startOfDay);
      existingProgress.workouts = workoutArray;
      await existingProgress.save();
      return res.json(existingProgress);
    } else {
      console.log("Creating new progress entry for date:", startOfDay);
      const newProgress = new Progress({ userId, date: startOfDay, workouts: workoutArray });
      await newProgress.save();
      return res.status(201).json(newProgress);
    }
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};


