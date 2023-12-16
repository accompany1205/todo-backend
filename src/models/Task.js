import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: {
    type: String,
    required: true,
    min: 20,
    max: 255,
  },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("Task", taskSchema);
