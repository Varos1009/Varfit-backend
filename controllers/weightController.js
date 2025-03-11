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

// ✅ Add or Update Weight Entry
export const updateWeight = async (req, res) => {
    const { userId, date, weight } = req.body;

    if (!userId || !date || !weight) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const existingEntry = await Weight.findOne({ userId, date });

        if (existingEntry) {
            existingEntry.weight = weight;
            await existingEntry.save();
            return res.json(existingEntry);
        } else {
            const newEntry = new Weight({ userId, date, weight });
            await newEntry.save();
            return res.status(201).json(newEntry);
        }
    } catch (error) {
        console.error("Error updating weight:", error);
        res.status(500).json({ message: "Server error" });
    }
};
