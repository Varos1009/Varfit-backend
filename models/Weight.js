import mongoose from "mongoose";

const WeightSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
    weight: { type: Number, required: true },
}, { timestamps: true });

const Weight = mongoose.model("Weight", WeightSchema);
export default Weight; 