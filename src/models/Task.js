import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 20,
    max: 255,
  },
  status: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);
