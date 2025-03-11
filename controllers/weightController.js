import Weight from "../models/Weight.js";

// ✅ Get Weight Data for a User
export const getUserWeight = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const weightData = await Weight.find({ userId }).sort({ date: 1 });
        res.json(weightData);
    } catch (error) {
        console.error("Error fetching weight data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Add Weight
export const addWeight = async (req, res) => {
  try {
    const { userId, date, weight } = req.body;

    // Check if the required fields are present
    if (!userId || !date || !weight) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new Weight entry
    const newWeight = new Weight({
      userId,
      date,
      weight,
    });

    // Save the new weight entry to the database
    await newWeight.save();

    // Return a success response
    return res.status(201).json(newWeight);
  } catch (error) {
    console.error("Error adding weight:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

