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

        if (!userId || !date || !weight) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newWeight = new Weight({
            userId,
            date,
            weight,
        });

        await newWeight.save();

        return res.status(201).json(newWeight);
    } catch (error) {
        console.error("Error adding weight:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

